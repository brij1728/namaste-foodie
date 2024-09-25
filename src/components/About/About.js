import { Component } from 'react';
import { User } from '../User';
import { UserClass } from '../UserClass/UserClass';

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
