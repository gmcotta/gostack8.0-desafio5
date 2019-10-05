import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import Container from '../../components/Container/index';
import { Form, SubmitButton, List } from './styles';

import api from '../../services/api';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    inputError: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    e.preventDefault();

    try {
      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      if (repositories.find(repo => repo.name === data.name)) {
        throw new Error('Repository duplicated');
      }

      this.setState({
        newRepo: '',
        repositories: [...repositories, data],
      });
      this.setState({ loading: false, inputError: false });
    } catch (error) {
      this.setState({
        newRepo: '',
      });
      this.setState({ loading: false, inputError: true });
    }
  };

  handleDelete = repo => {
    const { repositories } = this.state;

    this.setState({
      repositories: repositories.filter(r => r !== repo),
    });
  };

  render() {
    const { newRepo, repositories, loading, inputError } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositories
        </h1>
        <Form onSubmit={this.handleSubmit} error={inputError}>
          <input
            type="text"
            placeholder="Add repository"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {repositories.map(repo => (
            <li key={repo.name}>
              <span>{repo.name}</span>
              <div>
                <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                  Details
                </Link>
                <button type="button" onClick={() => this.handleDelete(repo)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
