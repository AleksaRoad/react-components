import styles from './ImageComponent.module.css';
import { Component } from 'react';
import type { ImageProps, ImageState } from './types';
import { Spinner } from '../Spinner';

export class ImageComponent extends Component<ImageProps, ImageState> {
  state = {
    isLoaded: false,
  };

  componentDidMount() {
    const img = new Image();
    img.src = this.props.src;
    img.onload = () => {
      this.setState({ isLoaded: true });
    };
  }

  render() {
    return this.state.isLoaded ? (
      <img src={this.props.src} alt={this.props.alt} />
    ) : (
      <div className={styles.skeleton}>
        <Spinner />
      </div>
    );
  }
}
