<?php

use Dotenv\Dotenv;

// Register autoloader
require_once __DIR__ . '/vendor/autoload.php';

// Initialize environment
$dotenv = new Dotenv(__DIR__);
$dotenv->load();
