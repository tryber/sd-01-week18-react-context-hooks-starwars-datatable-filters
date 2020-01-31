import React from 'react';
import storeContext from '../context';

class TextInput extends React.Component {
  render() {
    return (
      <div>
        <input
          type="text"
          onChange={(e) => this.context.setNameFilter(e.target.value)}
          placeholder="Nome"
          data-testid="nameInput"
        />
      </div>
    );
  }
}

TextInput.contextType = storeContext;

export default TextInput;
