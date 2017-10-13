import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';
import Link from './Link';

const mapStateToLinkProp = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
});
const mapDispatchToLinkProp = (dispatch, ownProps) => ({
  onClick() {
    dispatch(setVisibilityFilter(ownProps.filter));
  }
});
const FilterLink = connect(mapStateToLinkProp, mapDispatchToLinkProp)(Link);

export default FilterLink;
