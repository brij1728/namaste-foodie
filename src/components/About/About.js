import { Component } from 'react';
import { User } from '../User';
import { UserClass } from '../UserClass/UserClass';
import { UserContext } from '../../utils';

export class About extends Component {
  constructor(props) {
    super(props);
    console.log('About constructor');
  }
  
  componentDidMount() {
	console.log('About componentDidMount');
  }
  
  render() {
	console.log('About render');
    return (
      <div>
        {/* <div>
          <UserContext.Consumer>
            {({ loggedInUser }) => <h1>{loggedInUser}</h1>}
          </UserContext.Consumer>
        </div> */}
        <User name="Brijesh Kumar Singh" />
        <UserClass name="Brijesh Kumar Singh" location="Varanasi" />
        
      </div>
    );
  }
}
// export const About = () => {
//   return (
//     <div>
//       <User name="Brijesh Kumar Singh" />
//       <UserClass name="Brijesh Kumar Singh" location="Varanasi" />
//     </div>
//   );
// };
