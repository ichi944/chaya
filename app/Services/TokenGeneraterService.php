<?php
namespace APP\Services;

class TokenGeneraterService
{
    public function generateUserVerificationToken()
    {
        $length = 64;
        return bin2hex(random_bytes($length));
    }
}
