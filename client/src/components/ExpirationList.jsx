import React, { Component } from 'react'
import Item from './Item.jsx';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions.js';

class ExpirationList extends Component {

  componentWillMount() {
    this.props.fetchItems();
  }

  render() {
    const { expirationDates } = this.props;
    console.log(expirationDates);
    return (
        <div>
          {expirationDates.map(item => {
          return <Item item={item} key={item._id}/>
          })}
          {/* {expirationDates.map(item => {
            return (
              <div className="item" key={item._id}>
                <span>Item: {item.itemName}</span>
                <br />
                Expires {item.expirationDate? moment(item.expirationDate).fromNow() : null}
                <br />
                Expiration Date: {moment(item.expirationDate).format('MMM Do YYYY')}
              </div>
            )
          })} */}
        </div>
    )
  }
}

const mapStateToProps = state => {
  return { expirationDates: state.expirationDates.items }
}

const mapDispatchToProps = dispatch => ({
  fetchItems() {
    dispatch(getItems());
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(ExpirationList);