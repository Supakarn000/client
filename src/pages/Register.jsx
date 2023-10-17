import './Register.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [check,setCheck] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheck = () => {
    setCheck(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password || !check) {
      alert('Please fill in all fields');
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', import.meta.env.VITE_API + '/register', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log('Register Success');
        navigate('/login');
      } else {
        alert('Register Fail');
      }
    };

    xhr.onerror = function () {
      alert('Register Fail');
    };

    xhr.send(JSON.stringify(formData));
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="register">
      <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
      <h2>Register</h2>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label><br />
        <input type="text" id="username" name="username" placeholder="username" value={formData.username} onChange={handleChange} /><br />

        <label htmlFor="email">Email</label><br />
        <input type="email" id="email" name="email"  placeholder="name@gmail.com" value={formData.email} onChange={handleChange} /><br />

        <label htmlFor="password">Password</label><br />
        <input type="password" id="password" name="password" placeholder="Req One Upper and At least 8 characters" value={formData.password} onChange={handleChange} pattern="^[A-Z].{7,}$"/><br />

        <input type="checkbox" id='check' name='check' value="check" onChange={handleCheck}/> <a href='https://web.facebook.com/profile.php?id=100006137019693'>I have read agreement</a>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
