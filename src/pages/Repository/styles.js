import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
  }

  div {
    margin-left: 15px;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #7159c1;
        }
      }

      span {
        background: #eee;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }
    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;

export const FilterMenu = styled.div`
  margin-top: 30px;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 0;

  button {
    color: #7159c1;
    background: none;
    border: none;
    margin-left: 10px;
  }

  button.first {
    cursor: ${props => (props.firstPage ? 'not-allowed' : 'pointer')};
    opacity: ${props => (props.firstPage ? 0.6 : 'none')};
  }

  button.all {
    color: ${props => (props.githubPage === 'all' ? '#fff' : '#7159c1')};
    border: 1px solid #7159c1;
    border-radius: 5px;
    padding: 5px;
    background-color: ${props =>
      props.githubPage === 'all' ? 'rgb(113,89,193)' : 'none'};
    cursor: ${props =>
      props.githubPage === 'all' ? 'not-allowed' : 'pointer'};
    opacity: ${props => (props.githubPage === 'all' ? 0.6 : 'none')};
  }

  button.open {
    color: ${props => (props.githubPage === 'open' ? '#fff' : '#7159c1')};
    border: 1px solid #7159c1;
    border-radius: 5px;
    padding: 5px;
    background-color: ${props =>
      props.githubPage === 'open' ? 'rgb(113,89,193)' : 'none'};
    cursor: ${props =>
      props.githubPage === 'open' ? 'not-allowed' : 'pointer'};
    opacity: ${props => (props.githubPage === 'all' ? 0.6 : 'none')};
  }

  button.closed {
    color: ${props => (props.githubPage === 'closed' ? '#fff' : '#7159c1')};
    color: #fff;
    border: 1px solid #7159c1;
    border-radius: 5px;
    padding: 5px;
    background-color: ${props =>
      props.githubPage === 'closed' ? 'rgb(113,89,193)' : 'none'};
    cursor: ${props =>
      props.githubPage === 'closed' ? 'not-allowed' : 'pointer'};
    opacity: ${props => (props.githubPage === 'all' ? 0.6 : 'none')};
  }

  span {
    color: #7159c1;
    margin-left: 10px;
  }
`;

export const Footer = styled.div`
  margin-top: 30px;
  border-top: 1px solid #eee;
  display: flex;
  align-self: center;
  justify-content: space-around;
  padding: 10px 0;

  button {
    color: #7159c1;
    background: none;
    border: none;
    margin-left: 10px;
  }

  button.first {
    cursor: ${props => (props.firstPage ? 'not-allowed' : 'pointer')};
    opacity: ${props => (props.firstPage ? 0.6 : 'none')};
  }

  span {
    color: #7159c1;
    margin-left: 10px;
  }
`;
