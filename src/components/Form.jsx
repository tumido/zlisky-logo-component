import React, { Component } from 'react';
import { transliterate as tr } from 'transliteration';
import Logo from './Logo';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// import { MDCRipple } from '~@material/ripple';
// const fabRipple = new MDCRipple(document.querySelector('.mdc-fab'));

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      anchorMenu: null
    };
  }

  handleMenuOpen(event) {
    this.setState({ anchorMenu: event.currentTarget });
  };

  handleMenuClose() {
    this.setState({ anchorMenu: null });
  };

  handleNicknameUpdate(event) {
    this.setState({ nickname: tr(event.target.value) });
  }

  validateInput(event) {
    let key = tr(event.key).toLowerCase();
    if (key.charCodeAt(0) < 97 || key.charCodeAt(0) > 122) {
      event.preventDefault();
    }
  }

  componentDidMount() {
    // this.input.focus();
  }

  render() {
    const { anchorMenu } = this.state;
    return (
      <div className="form">
        <Logo nickname={this.state.nickname} />
        <Input
          onKeyPress={ (e) => this.validateInput(e) }
          onChange={ (e) => this.handleNicknameUpdate(e) }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Export"
                onClick={ (e) => this.handleMenuOpen(e)}
              >
                <SaveIcon />
              </IconButton>
            </InputAdornment>
          }
        />
        <Menu
          id="simple-menu"
          anchorEl={anchorMenu}
          open={Boolean(anchorMenu)}
          onClose={() => this.handleMenuClose()}
        >
          <MenuItem onClick={() => this.handleMenuClose()}>Exportovat SVG</MenuItem>
          <MenuItem onClick={() => this.handleMenuClose()}>Exportovat PNG</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default Form;
