<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function authenticate(Request $request) {
        $credentials = $request->validate( [
            //yang di sebelah kiri 'email' adalah inputnya, yang kanan rulesnya
            "email"=> ["required", "string", "email"],
            "password"=> ["required", "string", "min:3", "max:20"],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            // dd($request->all());

            return redirect()->intended(route('dashboard'));

            // return redirect()->route('test');
        }

        return back()->withErrors([
            "email"=> "The provided credentials do not match our records"
        ]);
    }

    public function logout(Request $request) {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route("login");
    }
}
