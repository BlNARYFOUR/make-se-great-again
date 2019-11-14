<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Game
{
    private $id;
    private $game_id;

    public function __construct($id, $game_id)
    {
        $this->id = $id;
        $this->game_id = $game_id;
    }
    
    public function getId()
    {
        return $this->id;
    }


    public function setId($id): void
    {
        $this->id = $id;
    }

    public function getGameId()
    {
        return $this->game_id;
    }

    public function setGameId($game_id): void
    {
        $this->game_id = $game_id;
    }



}
