<?php
/**
 * Created by PhpStorm.
 * User: brend
 * Date: 7/12/2018
 * Time: 9:50
 */

namespace App\Helpers;


use App\SocketModels\GameConnection;

class ConnectionFilter
{
    private $connection;

    function __construct($connection) {
        $this->connection = $connection;
    }

    function equals(GameConnection $gameConnection) {
        return $gameConnection->getConnection() == $this->connection;
    }

    function notEquals(GameConnection $gameConnection) {
        return !$this->equals($gameConnection);
    }
}