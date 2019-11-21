<?php
/**
 * Created by PhpStorm.
 * User: brend
 * Date: 14/11/2019
 * Time: 14:54
 */

namespace App\SocketModels;


use App\Helpers\ConnectionFilter;
use App\Helpers\MessageHandler;
use App\Models\Connection;
use Illuminate\Support\Arr;

class Env
{
    private $gameConnections;

    public function __construct() {
        $this->gameConnections = [];

        $this->initConsumers();
    }

    private function initConsumers() {
        MessageHandler::addConsumer("msega.actions.connect", $this, "connectRequestHandler");
    }

    function update() {
        $this->removeDeadGameConnections();

        // TODO
    }

    function getGameConnections() {
        return $this->gameConnections;
    }

    function markDeadGameConnection($connection) {
        $gameConnections = array_filter($this->gameConnections, array(new ConnectionFilter($connection), 'equals'));

        foreach ($gameConnections as $gc) {
            if($gc instanceof GameConnection) {
                $this->getGameConnectionById($gc->getId())->setDead(true);
            }
        }

        $this->logGameConnections();

        foreach ($this->gameConnections as $gc) {
            if($gc instanceof GameConnection) {
                echo "isDead: " . $gc->isDead() . "\n";
            }
        }
    }

    function removeDeadGameConnections() {
        for($i=count($this->gameConnections)-1; $i>=0; $i--) {
            $gameConnection = $this->gameConnections[$i];

            if($gameConnection instanceof GameConnection) {
                if($gameConnection->isDead()) {
                    Connection::destroy($gameConnection->getId());
                    array_splice($this->gameConnections, $i, 1);
                }
            }
        }

        //echo json_encode($this->players) . "\n";
    }

    function getGameConnectionById($id) {
        $gc = null;

        foreach ($this->gameConnections as $gameConnection) {
            if($gameConnection instanceof GameConnection) {
                if ($gameConnection->getId() === $id) {
                    $gc = $gameConnection;
                }
            }
        }

        return $gc;
    }

    function addGameConnection($name, $connection) : GameConnection {
        array_push($this->gameConnections, new GameConnection($name, $connection));

        $gc  = $this->gameConnections[count($this->gameConnections)-1];

        if($gc instanceof GameConnection) {
            $c = new Connection();

            $c->id = $gc->getId();
            $c->gameName = $gc->getName();

            $c->save();
        }
        return $gc;
    }

    function connectRequestHandler($connection, $data) {
        echo "Start Request Handler: Data: " . json_encode($data);

        $name = Arr::get($data, "name", -1);
        var_dump($name);

        if ($name != -1 && !$this->isAlreadyUsed($connection)) {
            $gameConnection = $this->addGameConnection($name, $connection);
            $gameConnection->getConnection()->send(json_encode([
                "address" => "msega.actions.connect",
                "id" => $gameConnection->getId(),
            ]));
        }

        echo "Connected:\n";
        $this->logGameConnections();
    }

    function isAlreadyUsed($connection) {
        $arr = array_filter($this->gameConnections, array(new ConnectionFilter($connection), "equals"));
        $arr = array_filter($arr, function (GameConnection $gameConnection) {
            return !$gameConnection->isDead();
        });

        return count($arr) != 0;
    }

    function logGameConnections() {
        $string = "";
        foreach ($this->gameConnections as $player) {
            $string .= "\t" . $player . "\n";
        }
        echo $string;
    }
}