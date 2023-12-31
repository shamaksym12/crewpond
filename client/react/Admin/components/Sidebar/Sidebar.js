import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Badge, Nav, NavItem, NavLink as RsNavLink } from 'reactstrap';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import nav from './_nav';
import SidebarFooter from '../SidebarFooter/SidebarFooter';
import SidebarForm from '../SidebarForm/SidebarForm';
import SidebarHeader from '../SidebarHeader/SidebarHeader';
import SidebarMinimizer from '../SidebarMinimizer/SidebarMinimizer';
import connect from 'react-redux/es/connect/connect';
import actions from '../../actions';
import { get } from 'lodash';
import { paths } from '../../../../../utils';
import selectors from './selectors';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.activeRoute = this.activeRoute.bind(this);
    this.hideMobile = this.hideMobile.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName, props) {
    // return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
    return props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  hideMobile() {
    if (document.body.classList.contains('sidebar-mobile-show')) {
      document.body.classList.toggle('sidebar-mobile-show');
    }
  }

  logout() {
    const { history: { push }, logout } = this.props;

    logout().then(() => {
      push(paths.client.ADMIN_LOGIN);
    }).catch(({ response: { data } }) => {
      const errorMessage = get(data, 'message', 'Something went wrong!');
      toast.error(errorMessage);
    });
  }

  // todo Sidebar nav secondLevel
  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }

  render() {
    const props = this.props;

    // badge addon to NavItem
    const badge = (badge) => {
      if (badge) {
        const classes = classNames(badge.class);
        return (<Badge className={classes} color={badge.variant}>{ badge.text }</Badge>);
      }
    };

    // simple wrapper for nav-title item
    const wrapper = item => (item.wrapper && item.wrapper.element ? (React.createElement(item.wrapper.element, item.wrapper.attributes, item.name)) : item.name);

    // nav list section title
    const title = (title, key) => {
      const classes = classNames('nav-title', title.class);
      return (<li key={key} className={classes}>{wrapper(title)} </li>);
    };

    // nav list divider
    const divider = (divider, key) => {
      const classes = classNames('divider', divider.class);
      return (<li key={key} className={classes} />);
    };

    // nav item with nav link
    const navItem = (item, key) => {
      const classes = {
        item: classNames(item.class),
        link: classNames('nav-link', item.variant ? `nav-link-${item.variant}` : ''),
        icon: classNames(item.icon),
      };
      return (
        navLink(item, key, classes)
      );
    };

    // nav link
    const navLink = (item, key, classes) => {
      const url = item.url ? item.url : '';
      return (
        <NavItem key={key} className={classes.item}>
          { isExternal(url) ?
            <RsNavLink href={url} className={classes.link} active>
              <i className={classes.icon} />{item.name}
            </RsNavLink>
            :
            <NavLink to={url} className={classes.link} activeClassName="active" onClick={this.hideMobile}>
              <i className={classes.icon} />{item.name}
            </NavLink>
          }
        </NavItem>
      );
    };

    // nav dropdown
    const navDropdown = (item, key) => (
      <li key={key} className={this.activeRoute(item.url, props)}>
        <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick}><i className={item.icon} />{item.name}</a>
        <ul className="nav-dropdown-items">
          {navList(item.children)}
        </ul>
      </li>);

    // nav type
    const navType = (item, idx) =>
      (item.title ? title(item, idx) :
        item.divider ? divider(item, idx) :
          item.children ? navDropdown(item, idx)
            : navItem(item, idx));

    // nav list
    const navList = items => items.map((item, index) => navType(item, index));

    const isExternal = (url) => {
      const link = url ? url.substring(0, 4) : '';
      return link === 'http';
    };

    // sidebar-nav root
    return (
      <div className="sidebar">
        <SidebarHeader />
        <SidebarForm />
        <nav className="sidebar-nav">
          <Nav>
            {navList(nav.items)}
            <li className='nav-item'>
              <a href="#" className='nav-link' onClick={this.logout}>
                <i className='fa fa-sign-out' />Sign Out
              </a>
            </li>
          </Nav>
        </nav>
        <SidebarFooter />
        <SidebarMinimizer />
      </div>
    );
  }
}

Sidebar.propTypes = {
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(
  selectors,
  {
    ...actions.authentication
  }
)(withRouter(Sidebar));
