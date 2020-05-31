import React from 'react';
import './App.scss';

import Topbar from "./components/Topbar";
import Filters from "./components/Filters";
import Contacts from "./components/Contacts";


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      contacts: [],
      listContacts: [],
    };
  }


  async componentDidMount() {
    const URL = "https://5e82ac6c78337f00160ae496.mockapi.io/api/v1/contacts";
    const response = await fetch(URL)
      .then(res => res.json())
      .catch(err => console.error(err))

    this.setState({
      contacts: response,
      sortedContacts: response,
    });
  }

  compare = (firstContact, secondContact, key) => {
    if (firstContact[key] < secondContact[key]) {
      return -1
    } else if (firstContact[key] > secondContact[key]) {
      return 1
    }
    return 0
  }

  handleSearchChange = e => {
    const sortedContacts = this.state.contacts.filter(contact => new RegExp(e.target.value, 'i').test(contact.name));
    this.setState({ sortedContacts: sortedContacts })
  }


  handleOnClickFilter = key => {
    const sortedContacts = [...this.state.sortedContacts].sort((firstContact, secondContact) => this.compare(firstContact, secondContact, key));
    this.setState({ sortedContacts: sortedContacts })
  }



  render() {
    return (
      <div className="app" data-testid="app">
        <Topbar />

        <Filters
          handleOnClickFilter={this.handleOnClickFilter}
          handleSearchChange={this.handleSearchChange}
        />

        <Contacts contacts={this.state.sortedContacts} />

      </div>
    )
  }
}

export default App;
