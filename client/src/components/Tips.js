import React, { useState } from 'react';
import { Button } from "semantic-ui-react"

const tips = [
  "Make a list of important information about your dog’s lifestyle including how often they’re fed, how much they’re fed, medications, their vet’s phone number, etc. Give copies of this to someone in your life that could take care of your dog in the case of an emergency.",
  "Don't overfeed your dog, it will significantly impact their health and happiness",
  "Your dog’s nose should feel wet. The level of moisture will vary between dogs and by time of year, but a healthy dog will have a cool and slightly wet nose because dogs secrete sweat through their nose to cool down.",
  "Brushing your dog’s teeth is often overlooked, but hugely important to their overall health and avoiding expensive dental treatments in the future.",
  "Regular walks provide many benefits for your dog, including preventing boredom, helping the digestive tract, keeping them at a healthier weight, and helping them to burn off excess energy.",
  " Applaud and cheer your dog on when they go outside and do their business every time and they’ll eagerly continue this behavior until it becomes a habit. ",
  "Dogs need love and affection to thrive. Make sure they’re spending plenty of time inside with you and your family. Give them attention, treats, and play games with them.",
  "Dogs have a short memory and if you scold them for doing something wrong five minutes later, they will not correlate the scolding with the bad behavior. Reprimand them only if you catch them in the act.", "Cold weather can cause your dog’s paws to crack due to the dry air. Try moisturizing your dog’s paws with pad moisturizer products topically to relieve the discomfort especially if they seem raw or painful after your pup has been outside.", "The inside temperature of a car can quickly become hazardous or even fatal to your dog. Never leave them unsupervised in your car, even with the windows cracked, as they can easily succumb to heatstroke.", "If your dog gets lost but is microchipped, a veterinary hospital or animal shelter will scan all found pets for microchips and can look up your personal information and get in contact with you if your dog has one.", "All dogs need to have clean and fresh water available at all times of the day. Make sure to replenish the water and wash all food and water dishes so they don’t hold bacteria.", "Regularly grooming your pet ensures they are clean and pest-free. While some dogs only need a bath every few months, others need regular grooming. If your dog sheds, you’ll want to brush it often."
];

const Tips = () => {
  const [tipsIndex, setTipsIndex] = useState(0);

  const handleClick = () => {
    setTipsIndex(Math.floor(Math.random() * tips.length));
  };

  return (
    <div>

      <p className='tips-text'>{tips[tipsIndex]}</p>
      <Button primary compact onClick={handleClick}>Get More Tips!</Button>


    </div>
  );
};

export default Tips;
