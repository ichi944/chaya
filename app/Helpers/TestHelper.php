<?php
namespace App\Helpers;

class TestHelper {

    /**
     * return the array for jwt-authentication
     * @param $token
     * @param array $headers
     * @return array
     */
    public static function createHeaderWithAuthorizationToken($token, Array $headers = [])
    {
        $auth_header['Authorization'] = 'Bearer ' . $token;
        return array_merge($headers, $auth_header);
    }

    /**
     * @return string
     */
    public static function getApiBase()
    {
        return '/api/v1.0.0';
    }
}
