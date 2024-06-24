import { useState } from 'react';

export default function Player({
  initialName,
  symbole,
  isActive,
  changeName,
  isSelected,
}) {
  let [isEdited, setisEdited] = useState(false);
  let [playerName, setplayerName] = useState(initialName);

  let buttonName = 'Edit';
  let editiblePlayerName = <span className='player-name'>{playerName}</span>;

  function handleChange(event) {
    setplayerName(event.target.value);
  }

  function clicked() {
    setisEdited((editing) => !editing);
    if (isEdited) {
      changeName(symbole, playerName);
    }
  }
  if (isEdited) {
    editiblePlayerName = (
      <input type='text' required value={playerName} onChange={handleChange} />
    );
    buttonName = 'Save';
  }
  return (
    <li className={isActive}>
      <span className='player'>
        {editiblePlayerName}
        <span className='player-symbole'>{symbole}</span>
      </span>
      <button onClick={clicked} disabled={isSelected}>
        {buttonName}{' '}
      </button>
    </li>
  );
}
