import React from 'react'
import { Card, Image, Container } from 'semantic-ui-react'

const HealthTipsArticles = () => (
    <main>
    <Container className='health-cards'>
  <Card>
    <Image src='https://user-images.githubusercontent.com/110498167/217689597-4b965cdc-3409-4b0f-a6bb-a785478db7bd.jpg' wrapped ui={false} />
    <Card.Content>
      <Card.Header>Health Tip #1</Card.Header>
      <Card.Meta>posted 01/18/2023</Card.Meta>
      <Card.Description>
      Make a list of important information about your dog’s lifestyle including how often they’re fed, how much they’re fed, medications, their vet’s phone number, etc. Give copies of this to someone in your life that could take care of your dog in the case of an emergency.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a href="https://www.forbes.com/advisor/pet-insurance/dog-care-tips/">
               Read more on Forbes
      </a>
    </Card.Content>
  </Card>

  <Card>
  <Image src='https://user-images.githubusercontent.com/110498167/217690197-027e1454-57a9-4217-baf4-e531db8b483f.jpg' wrapped ui={false} />
  <Card.Content>
    <Card.Header>Health Tip #2</Card.Header>
    <Card.Meta>posted 02/01/2023</Card.Meta>
    <Card.Description>
    Don't overfeed your dog, it will significantly impact their health and happiness
    </Card.Description>
  </Card.Content>
  <Card.Content extra>
      <a href="https://www.forbes.com/advisor/pet-insurance/dog-care-tips/">
               Read more on Forbes
      </a>
    </Card.Content>
</Card>
<Card>
  <Image src='https://user-images.githubusercontent.com/110498167/217689995-5650c2ff-0056-4ab6-85ee-9b0e0607f740.jpg' wrapped ui={false} />
  <Card.Content>
    <Card.Header>Health Tip #3</Card.Header>
    <Card.Meta>posted 02/04/2023</Card.Meta>
    <Card.Description>
    Your dog’s nose should feel wet. The level of moisture will vary between dogs and by time of year, but a healthy dog will have a cool and slightly wet nose because dogs secrete sweat through their nose to cool down.
    </Card.Description>
  </Card.Content>
  <Card.Content extra>
      <a href="https://www.forbes.com/advisor/pet-insurance/dog-care-tips/">
               Read more on Forbes
      </a>
    </Card.Content>
</Card>
<Card>
  <Image src='https://user-images.githubusercontent.com/110498167/217690396-6ecd850a-a8f0-44e8-ba4d-2f5b3f09f010.jpg' wrapped ui={false} />
  <Card.Content>
    <Card.Header>Health Tip #4</Card.Header>
    <Card.Meta>posted 02/08/2023</Card.Meta>
    <Card.Description>
    Applaud and cheer your dog on when they go outside and do their business every time and they’ll eagerly continue this behavior until it becomes a habit.
    </Card.Description>
  </Card.Content>
  <Card.Content extra>
      <a href="https://www.forbes.com/advisor/pet-insurance/dog-care-tips/">
               Read more on Forbes
      </a>
    </Card.Content>
</Card>
</Container>
</main>
)

export default HealthTipsArticles; 