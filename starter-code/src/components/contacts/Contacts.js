import React from "react";
import contacts1 from '../../json/contacts.json';
import "./Contacts.css"

class Contactlist extends React.Component {
    state = {
        contactArray: contacts1.splice(0, 5)
    };
    addNewContact = () => {
        let random = Math.floor(Math.random() * contacts1.length - 1);

        const contactCopy = [...this.state.contactArray];
        contactCopy.push(contacts1[random]);

        this.setState({
            contactArray: contactCopy
        });

    };
    sortPopularity = (numeric) => {

        const copy = [...this.state.contactArray];
        numeric ? copy.sort((a, b) => b.popularity - a.popularity) : copy.sort((a, b) => a.name.localeCompare(b.name));

        this.setState({
            contactArray: copy
        });

    }
    deleteContact = prodToBeDeleted => {
        let f = this.state.contactArray.filter(el => el.id !== prodToBeDeleted.id)

    };

    search = e => {

        const f = this.state.contactArray.filter(el => el.name.toLowerCase().includes(e.target.value))
        this.setState({
            contactArray: f
        })
    }

    render() {


        return (
            <div >
                <div className="btnClass">
                    <input type="text" name="search" onChange={this.search}></input>
                    <button onClick={this.addNewContact}> Add Random Contact </button>
                    <button onClick={() => this.sortPopularity(false)}> Sort by name </button>
                    <button onClick={() => this.sortPopularity(true)}> Sort by popularity </button>

                </div>

                <table>
                    <tr>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Popularity</th>
                        <th>Action</th>
                    </tr>
                    {this.state.contactArray.map(elem => {
                        return <tr key={elem.id}>
                            <td><img src={elem.pictureUrl} /></td>
                            <td>{elem.name} </td>
                            <td>{elem.popularity.toFixed(2)}</td>
                            <td><button onClick={() => this.deleteContact(elem)}> Delete </button></td>

                        </tr>
                    })}
                </table>


            </div>
        );
    }
}

export default Contactlist;