import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Container from '../../components/Container/index';
import { Loading, Owner, IssueList, FilterMenu, Footer } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    githubState: 'all',
    page: 1,
    firstPage: true,
  };

  componentDidMount() {
    this.showIssues();
  }

  showIssues = async () => {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const { githubState, page } = this.state;

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: githubState,
          per_page: 10,
          page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
    console.log(this.state);
  };

  handlePrevPage = async () => {
    const { page } = this.state;
    if (page > 1) {
      await this.setState({
        firstPage: false,
        page: page - 1,
      });
      this.showIssues();
    } else {
      await this.setState({
        firstPage: true,
      });
    }
  };

  handleNextPage = async () => {
    const { page } = this.state;
    await this.setState({
      page: page + 1,
    });
    this.showIssues();
  };

  handleAllOption = async () => {
    await this.setState({
      githubState: 'all',
      page: 1,
    });
    this.showIssues();
  };

  handleOpenOption = async () => {
    await this.setState({
      githubState: 'open',
      page: 1,
    });
    this.showIssues();
  };

  handleClosedOption = async () => {
    await this.setState({
      githubState: 'closed',
      page: 1,
    });
    this.showIssues();
  };

  render() {
    const {
      repository,
      issues,
      loading,
      page,
      firstPage,
      githubState,
    } = this.state;

    if (loading) {
      return <Loading>Loading...</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Back to the repositories</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <FilterMenu firstPage={firstPage} githubState={githubState}>
          <div>
            <button
              className="all"
              type="button"
              onClick={() => this.handleAllOption()}
            >
              All
            </button>
            <button
              className="open"
              type="button"
              onClick={() => this.handleOpenOption()}
            >
              Open
            </button>
            <button
              className="closed"
              type="button"
              onClick={() => this.handleClosedOption()}
            >
              Closed
            </button>
          </div>
          <div>
            <button
              className="first"
              type="button"
              onClick={() => this.handlePrevPage()}
            >
              Prev Page
            </button>
            <span>{page}</span>
            <button type="button" onClick={() => this.handleNextPage()}>
              Next Page
            </button>
          </div>
        </FilterMenu>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>

                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <Footer firstPage={firstPage}>
          <div>
            <button
              className="first"
              type="button"
              onClick={() => this.handlePrevPage()}
            >
              Prev Page
            </button>
            <span>{page}</span>
            <button type="button" onClick={() => this.handleNextPage()}>
              Next Page
            </button>
          </div>
        </Footer>
      </Container>
    );
  }
}
