import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { Coffeetype } from '../data/Coffeetype';
import { ContryCode } from '../data/contrycode';
import '../../style/orderd.css';

const countryCodes = ContryCode;

const Orderd = () => {
  const location = useLocation();
  const { image, code, cname, description } = location.state || {};

  const [formData, setFormData] = useState({
    name: '',
    user_email: '',
    user_phone: '',
    country_code: '+1',
    coffeeType: cname || '',
    coffeeCategory: '',
    coffeeGrade: '',
    quantity: '',
    user_companyname: '',
    user_website: '',
    delivery_address: '',
    price: '',
  });

  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'coffeeType') {
      setFormData(prev => ({
        ...prev,
        coffeeType: value,
        coffeeCategory: '',
        coffeeGrade: '',
        price: '',
      }));
      return;
    }

    if (name === 'coffeeCategory') {
      setFormData(prev => ({
        ...prev,
        coffeeCategory: value,
        coffeeGrade: '',
        price: ''
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'coffeeGrade') {
      const selectedCoffee = Coffeetype.find(coffee => coffee.cname === formData.coffeeType);
      if (selectedCoffee) {
        const selectedCategory = selectedCoffee.catagory?.find(category => category.titles === formData.coffeeCategory);
        const selectedGrade = selectedCategory?.grades?.find(grade => grade.gname === value);
        
        if (selectedGrade) {
          setFormData(prev => ({
            ...prev,
            price: selectedGrade.price,
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            price: '',
          }));
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    const emailData = {
      cname: formData.coffeeType,
      coffeeCategory: formData.coffeeCategory,
      coffeeGrade: formData.coffeeGrade,
      quantity: formData.quantity,
      name: formData.name,
      user_email: formData.user_email,
      user_phone: `${formData.country_code} ${formData.user_phone}`,
      user_companyname: formData.user_companyname,
      user_website: formData.user_website,
      delivery_address: formData.delivery_address,
    };

    emailjs.send('service_w6blv2o', 'template_ys7e7mk', emailData, 'Puv041KtiA_TZduH2')
      .then(response => {
        alert('Order placed successfully!');
        resetForm();
      })
      .catch(err => {
        alert('Failed to place order, please try again. Error: ' + (err.text || "Unknown error"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      user_email: '',
      user_phone: '',
      country_code: '+1',
      coffeeType: cname || '',
      coffeeCategory: '',
      coffeeGrade: '',
      quantity: '',
      user_companyname: '',
      user_website: '',
      delivery_address: '',
      price: '',
    });
  };

  if (!location.state) {
    return <p>No information available. Check the console for debugging.</p>;
  }

  const selectedCoffee = Coffeetype.find(coffee => coffee.cname === formData.coffeeType);

  return (
    <div className="orderd-containers">
      <div className="imageso">
        {imageError ? (
          <p className="error">Image failed to load</p>
        ) : (
          <img
            src={image}
            alt={cname || 'Item Image'}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={imageLoaded ? 'loaded' : ''}
          />
        )}
        <div className="description">
          <p>{description || 'Description Not Available'}</p>
        </div>
        <div className="orders">
          <p><b>Fill out the forms below to submit your order</b></p>
        </div>
      </div>
      <div className="details">
        <form onSubmit={handleSubmit}>
          <h3>{formData.coffeeType || 'Title Not Available'}</h3>
          <p>Product Code: {code || 'Code Not Available'}</p>
          <p>Price: {formData.price || 'Select Coffee Grade first'}</p>
          <div>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Name" />
          </div>
          <div>
            <input type="text" name="user_companyname" value={formData.user_companyname} onChange={handleChange} required placeholder="Company Name" />
          </div>
          <div>
            <input type="text" name="user_website" value={formData.user_website} onChange={handleChange} required placeholder="Website" />
          </div>
          <div>
            <input type="email" name="user_email" value={formData.user_email} onChange={handleChange} required placeholder="Email" />
          </div>
          <div className="phone-input">
            <select className='country_code' name="country_code" value={formData.country_code} onChange={handleChange} required>
              {countryCodes.map((country, index) => (
                <option key={index} value={country.code}>
                  {country.flag} {country.code}
                </option>
              ))}
            </select>
            <div className="separator">-</div>
            <input type="tel" name="user_phone" value={formData.user_phone} onChange={handleChange} required placeholder="Phone number" />
          </div>
          <div>
            <input type="text" name="delivery_address" value={formData.delivery_address} onChange={handleChange} required placeholder="Delivery Address" />
          </div>

          {/* Render radio buttons for coffee categories */}
          {selectedCoffee?.catagory?.map((category, index) => (
            <div key={index}>
              <input
                type="radio"
                name="coffeeCategory"
                value={category.titles} // Set the value to category titles
                checked={formData.coffeeCategory === category.titles} // Check if it matches the current state
                onChange={handleChange}
              />
              {category.titles}
            </div>
          ))}

          <div>
            <select name="coffeeGrade" value={formData.coffeeGrade} onChange={handleChange} required>
              <option value="">Select Coffee Grade</option>
              {selectedCoffee?.catagory?.find(category => category.titles === formData.coffeeCategory)?.grades?.map((grade, index) => (
                <option key={index} value={grade.gname}>
                  {grade.gname}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="1" max="10" required placeholder="Quantity" />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Ordering...' : 'Send Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Orderd;