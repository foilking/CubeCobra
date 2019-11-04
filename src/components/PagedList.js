import React, { Component } from 'react';

import { Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';

class PagedList extends Component {
  constructor(props) {
    super(props);

    this.state = { page: 0 };

    this.setPage = this.setPage.bind(this);
  }

  setPage(event) {
    event.preventDefault();
    this.setState({
      page: parseInt(event.target.getAttribute('page')),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.rows.length !== this.props.rows.length) {
      this.setState({ page: 0 });
    }
    /* global */
    autocard_init('autocard');
  }

  render() {
    const { pageSize, rows, children, ...props } = this.props;
    const { page } = this.state;
    const displayRows = rows.slice(page * pageSize, (page + 1) * pageSize);
    const validPages = [...Array(Math.ceil(rows.length / pageSize)).keys()];

    return <>
      {validPages.length === 1 ? '' :
        <Pagination aria-label="Table page" className="mt-3">
          {validPages.map(page =>
            <PaginationItem key={page} active={page === this.state.page}>
              <PaginationLink tag="a" href="#" page={page} onClick={this.setPage}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}
        </Pagination>
      }
      {displayRows}
    </>;
  }
}

PagedList.defaultProps = {
  pageSize: 60,
};

export default PagedList;
