import React, { useState } from 'react';
const Player=(props)=>{
    const [playerName,setPlayerName]=useState(props.initialName);
    const [isEditing,setIsEditing]=useState(false);
    const editHandle=()=>{
        setIsEditing((prev)=>{
            return !prev;
        });
        if(isEditing){
            props.onChangeName(props.initialSymbol,playerName);
        }
    }
    const handleChange=(event)=>{
        setPlayerName(event.target.value);
    }
    return(
        <li className={(props.isActive)? 'active':undefined}>
          <span className="player">
          {!isEditing && <span className="player-name">{playerName}</span>}
          {isEditing && <input type='text' required value={playerName} onChange={handleChange}/>}
          <span className="player-symbol">{props.initialSymbol}</span>
          </span>
          <button onClick={editHandle}>{!isEditing && 'Edit'}{isEditing && 'Save'}</button>
        </li>
    );
}
export default Player;