import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [userData, setUserData] = useState([]);
  const [cardColor, setCardColor] = useState('#f8f9fa'); // Initial card color
  const [randomUser, setRandomUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      setUserData(response.data.users);
      setRandomUser(response.data.users.length > 0 ? getRandomUser(response.data.users) : null);
      setCardColor(randomColor());
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const getRandomUser = (users) => {
    return users[Math.floor(Math.random() * users.length)];
  };

  const refresh = () => {
    setRandomUser(getRandomUser(userData));
    setCardColor(randomColor());
  };

  const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="container-fluid " style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="col-md-4">
          <div className="card" style={{ backgroundColor: cardColor, boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)' }}>
            {randomUser && (
              <>
                <div className="row no-gutters m-5">
                  <div className="col-md-6">
                    <img src={randomUser.image} alt="User" className="card-img" style={{ width: '100%', height: 'auto' }} />
                    <p className="mt-4"><strong>Birth Date:</strong> {randomUser.birthDate}</p>
                          <p><strong>Age:</strong> {randomUser.age}</p>
                          <p><strong>Height:</strong> {randomUser.height} cm</p>
                          <p><strong>Weight:</strong> {randomUser.weight} kg</p>
                  </div>
                  <div className="col-md-6">
                    <div className="card-body">
                      <h5 className="card-title text-center">User Details</h5>
                      
                        
                          <p mt-4><strong>Home Address:</strong> {randomUser.address.address}, {randomUser.address.city}, {randomUser.address.state} {randomUser.address.postalCode}</p>
                          <p><strong>Mobile:</strong> {randomUser.phone}</p>
                          <p><strong>Company:</strong> {randomUser.company.name}</p>
                          <p><strong>Job Title:</strong> {randomUser.company.title}</p>
                          <p><strong>Email:</strong> {randomUser.email}</p>
                       
                     
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="text-center mt-3">
            <button className="btn btn-warning" onClick={refresh}>
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
