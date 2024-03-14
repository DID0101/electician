import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './ContactPage.css';
import CalendlyWidget from './CalendlyWidget';
import Titles from '../../components/Titles/Titles';
import Button from '../../components/Button/Button';
import { BsFillSendCheckFill } from 'react-icons/bs';
import Contact_img from '../../assets/contact_img.png';
import FirstSectionOfPages from '../../components/FirstSectionOfPages/FirstSectionOfPages';
import MoveToNextPage from '../../sections/MoveToNextPage/MoveToNextPage';
import Contact_img_02 from '../../assets/contact_img_02.png';

export default function ContactPage() {
  const form = useRef();
  const [messageSent, setMessageSent] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const handleChange = (e) => {
    const emailValue = e.target.value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = emailPattern.test(emailValue);

    setEmail(emailValue);
    setValidEmail(isValidEmail);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (validEmail) {
      console.log('Valid email: ' + email);
      emailjs
        .sendForm('service_xcat7ip', 'template_21deuyb', form.current, '-kV9F-1LyRZhtmyar')
        .then(
          (result) => {
            console.log(result.text);
            setShowNotification(true);
            setMessageSent('Your Message has been sent Successfully!');
            setEmail('');
            setValidEmail(false);
            // Réinitialiser le formulaire
            e.target.reset();
            // Effacer la notification après 3 secondes
            setTimeout(() => {
              setShowNotification(false);
            }, 3000);
          },
          (error) => {
            console.log(error.text);
          }
        );
    } else {
      console.log('Invalid email: ' + email);
    }
  };

  return (
    <>
      <FirstSectionOfPages title="Contact Me" logo={Contact_img} />
      
      <div className="container">
        <section className="contact my-5" id="contact">
          <Titles title="contact me" />
         
          <div className="contact_info" id="mobile_column">
          <CalendlyWidget />
          </div>
        </section>
      </div>
      <MoveToNextPage move_title="Back To Home" move_link="/" />
    </>
  );
}
