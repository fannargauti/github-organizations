import React, { Component } from 'react';
import './AnimationInput.css';

class AnimationInput extends Component {
  placeholders = [
    'google',
    'pied piper',
    'facebook',
    'spotify',
    'dohop',
    'futurice',
  ];
  state = {
    placeholder: '',
    placeholderIndex: 0,
    pos: 0,
    isReverse: false,
  };

  async componentDidMount() {
    this.animatePlaceHolder();
  }

  animatePlaceHolder() {
    const { value } = this.props;
    const { isReverse, placeholder, placeholderIndex } = this.state;

    if (value) {
      return this.setState({
        placeholder: this.placeholders[placeholderIndex],
      });
    }

    // Delay used between each "entry" of character to make typing more realistic.
    // If we are going in reverse, make the first deletion more slow to simulate the wait for key repeat keyboard
    // to kick in.
    const reverseAnimationDelay =
      placeholder === this.placeholders[placeholderIndex] ? 500 : 30;
    const animationDelay = isReverse
      ? reverseAnimationDelay
      : Math.floor(Math.random() * (200 - 70) + 70);

    setTimeout(() => {
      this.setState((prevState) => {
        const prevPos = prevState.pos;
        const prevPlaceholderIndex = prevState.placeholderIndex;
        const prevPlaceholder = prevState.placeholder;
        let newPos = prevPos;
        let newPlaceholderIndex = prevPlaceholderIndex;

        // if we are at the final placeholder in the array of placeholders, reset the index to start again.
        if (prevPlaceholderIndex >= this.placeholders.length) {
          return { placeholderIndex: 0 };
        }
        // Check if we are at the final character, flip to reverse mode.
        let newIsReverse =
          prevPos >= this.placeholders[prevPlaceholderIndex].length - 1;
        if (prevState.isReverse) {
          // If we are in reverse mode and the current placeholder value is empty,
          // the animation for the current placeholder is finished and we can start
          // animating the next placeholder.
          // Reset position and the reverse switch. Increment the placeholder index to get the next placeholder
          if (prevPlaceholder === '') {
            newIsReverse = false;
            newPos = 0;
            newPlaceholderIndex = prevPlaceholderIndex + 1;
          }
          // If we are not in reverse mode, increment the position in the placeholder.
        } else {
          newPos = prevPos + 1;
        }
        // If we are in reverse mode, remove the last letter from the placeholder to simulate "backspace"
        // otherwise, add the next letter
        const newPlaceholder = prevState.isReverse
          ? prevPlaceholder.slice(0, -1)
          : prevPlaceholder + this.placeholders[prevPlaceholderIndex][prevPos];

        return {
          placeholder: newPlaceholder,
          placeholderIndex: newPlaceholderIndex,
          pos: newPos,
          isReverse: newIsReverse,
        };
      });
      // recursively call the function to simulate typing and apply the random delay
      this.animatePlaceHolder();
    }, animationDelay);
  }

  handleInputChange(e) {
    const { onChange } = this.props;
    onChange(e);
  }

  render() {
    const { value } = this.props;
    const { placeholder } = this.state;
    return (
      <input
        className="AnimationInput"
        type="text"
        name="org"
        placeholder={placeholder}
        value={value}
        onChange={(e) => this.handleInputChange(e)}
      ></input>
    );
  }
}

export default AnimationInput;
