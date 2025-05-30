<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductVariant;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Log;

class OrderController extends Controller
{
    public function createOrder(Request $request)
    {
        DB::beginTransaction();

        try {
            $request->validate([
                'address' => ['required', 'string'],
                'phone' => ['required', 'string'],
                'postal_code' => ['required', 'string'],
                'products.*.id' => ['required', 'string', 'exists:product_variants,id'],
                'products.*.quantity' => ['required', 'integer', 'min:1'],
            ]);

            $order = Order::create([
                'user_id' => $request->user()->id,
                'address' => $request->address,
                'phone' => $request->phone,
                'postal_code' => $request->postal_code,
                'payment_channel' => '',
                'payment_method' => '',
                'country' => $request->country,
            ]);

            $total = 0;

            foreach ($request->products as $variantData) {
                $variant = ProductVariant::find($variantData['id']);

                if ($variant->stock < $variantData['quantity']) {
                    throw new Exception('Product variant with id {$variant->id} is out of stock');
                }

                $variant->decrement('stock', $variantData['quantity']);

                $price = $variant->product->price * $variantData['quantity'];

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_variant_id' => $variant->id,
                    'quantity' => $variantData['quantity'],
                    'price' => $price
                ]);

                $total += $price;
            }

            $order->update([
                'total' => $total
            ]);

            DB::commit();

            return response()->json([
                'data' => $order,
                'message' => 'Order created successfully',
            ], 200);
        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                'data' => null,
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function payOrder(Request $request, Order $order)
    {
        DB::beginTransaction();

        try {
            $user = $request->user();

            if ($order->user_id != $user->id) {
                throw new Exception("This is not your order");
            }

            if ($order->status == "PAID") {
                throw new Exception("Order already paid");
            }

            if ($order->url != null) {
                return response()->json([
                    'data' => $order->url,
                    'message' => 'Generated invoice successfully'
                ]);
            }

            $apiKey = env('XENDIT_API_KEY');

            $payLoad = [
                'external_id' => (string) $order->id,
                'description' => "Invoice for order {$order->id}",
                'amount' => (float) $order->total,
                'invoice_duration' => 172800, // 2 hari dalam detik
                'currency' => 'IDR',
                'reminder_time' => 1,
            ];

            // Siapkan cURL
            $ch = curl_init();

            curl_setopt($ch, CURLOPT_URL, 'https://api.xendit.co/v2/invoices');
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payLoad));
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Content-Type: application/json',
                'Authorization: Basic ' . base64_encode($apiKey . ':'),
            ]);

            $response = curl_exec($ch);

            if (curl_errno($ch)) {
                throw new Exception('Curl error: ' . curl_error($ch));
            }

            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($httpCode != 200 & $httpCode != 201) {
                //Kalau respon error, bisa decode pesan errornya
                $errorResponse = json_decode($response, true);
                $message = $errorResponse['message'] ?? 'Failed to create invoice';
                throw new Exception($message);
            }

            $result = json_decode($response, true);

            $order->url = $result['invoice_url'];
            $order->save();

            DB::commit();

            return response()->json([
                'data' => $result['invoice_url'],
                'message' => 'Generated invoice succesfully'
            ], 200);
        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                'data' => null,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function webhookPayment(Request $request)
    {
        $signature_header = $request->header('x-callback-token');
        $secret = env('XENDIT_WEBHOOK_TOKEN');

        if ($signature_header != $secret) {
            return response()->json([
                'data' => null,
                'message' => 'Unauthorized',
            ], 401);
        }

        $payload = $request->all();
        $order = Order::find($payload['external_id']);

        // Log::info($payload);

        if (!$order) {
            return response()->json([
                'data' => null,
                'message' => 'Order not found',
            ], 404);
        }

        $order->update([
            'status' => strtoupper($payload['status']),
            'payment_channel' => $payload['payment_channel'],
            'payment_method' => $payload['payment_method'],
        ]);

        return response()->json([
            'data' => null,
            'message' => 'Order status updated'
        ], 200);
    }

    public function getOrders(Request $request)
    {
        $user = $request->user(); 

        // $orders = Order::where('user_id', $user->id)
        //     ->with(['orderItems'])
        //     ->get(); -> bisa pakai ini atau tambahin "load" di relasi data di bawah ini:

        return response()->json([
            'data'=> $user->load(['orders.orderItems']),
            'message'=> 'Get orders success',
        ], 200);
    }

    public function getOrder(Request $request, Order $order)
    {
        $user = $request->user();

        if ($order->user_id != $user->id) {
            return response()->json([
                'data'=> null,
                'message'=> "This is not your orders"
            ], 403);
        }

        return response()->json([
            "data"=> $order->load(['orderItems']),
            "message"=> "Get order success"
        ], 200);
    }

};