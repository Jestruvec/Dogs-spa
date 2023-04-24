import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTemperaments } from "../../redux/actions";

const TemperamentSelect = ({ setFormValues, formValues }) => {
  const dispatch = useDispatch();

  const [selectedTemperaments, setSelectedTemperaments] = useState([]);

  const allTemperaments = useSelector((state) => state.allTemperaments);
  allTemperaments.sort((a, b) => (a.name > b.name ? 1 : -1));

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);

  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;

    setSelectedTemperaments([...selectedTemperaments, selectedOption]);
    setFormValues({
      ...formValues,
      temperaments: [...formValues.temperaments, selectedOption],
    });
  };

  return (
    <>
      <select onChange={handleSelectChange}>
        <option value>Select temperaments</option>
        {allTemperaments.map((temp) => (
          <option value={temp.id} key={temp.id}>
            {temp.name}
          </option>
        ))}
      </select>
      {/* <div>
        <p>Selected temperaments: </p>
        <ul>
          {selectedTemperaments.map((temp, index) => (
            <li key={index}>{temp}</li>
          ))}
        </ul>
      </div> */}
    </>
  );
};
export default TemperamentSelect;

// import React from "react";
// import { connect } from "react-redux";
// import { getAllTemperaments } from "../../redux/actions";

// class TemperamentSelect extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedTemperaments: [],
//     };
//     this.handleSelectChange = this.handleSelectChange.bind(this);
//   }

//   componentDidMount() {
//     this.props.getAllTemperaments();
//   }

//   handleSelectChange(e) {
//     const selectedOption = e.target.value;
//     this.setState((prevState) => ({
//       selectedTemperaments: [...prevState.selectedTemperaments, selectedOption],
//     }));
//     this.props.setFormValues({
//       ...this.props.formValues,
//       temperaments: [...this.props.formValues.temperaments, selectedOption],
//     });
//   }

//   render() {
//     const { allTemperaments } = this.props;
//     allTemperaments.sort((a, b) => (a.name > b.name ? 1 : -1));

//     return (
//       <>
//         <select onChange={this.handleSelectChange}>
//           <option value>Select temperaments</option>
//           {allTemperaments.map((temp) => (
//             <option value={temp.id} key={temp.id}>
//               {temp.name}
//             </option>
//           ))}
//         </select>
//         <div>
//           <p>Selected temperaments: </p>
//           <ul>
//             {this.state.selectedTemperaments.map((temp, index) => (
//               <li key={index}>{temp}</li>
//             ))}
//           </ul>
//         </div>
//       </>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   allTemperaments: state.allTemperaments,
// });

// const mapDispatchToProps = (dispatch) => ({
//   getAllTemperaments: () => dispatch(getAllTemperaments()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(TemperamentSelect);
