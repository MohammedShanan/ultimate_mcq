<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $felids = $request->validate([
            "name" => ['required', 'max:255', 'unique:users'],
            "password" => ['required', 'confirmed'],
        ]);
        $user = User::create($felids);
        $token = $user->createToken($request->name);
        return ['token' => $token, 'user' => $user];
    }

    public function login(Request $request)
    {
        return 'login';
    }

    public function logout(Request $request)
    {
        return 'logout';
    }
}
