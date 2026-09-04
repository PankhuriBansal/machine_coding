import { Card, Button } from 'react-bootstrap'
import CartState from "./context/Context"
import Rating from './Rating'
const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch
  } = CartState()


  return (
    <div className='products'>
      <Card>
        <Card.Img
          className='card-img'
          variant='top'
          src={prod.image}
          alt={prod.name}
        />
        <Card.Body>
          <Card.Title>{prod.name}</Card.Title>
          <Card.Subtitle>
            <span>{prod.price.split('.')[0]}</span>
            {prod.fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 days delivery</div>
            )}
            <Rating rating={prod.ratings} />
          </Card.Subtitle>
          {/* product inside cart */}
          {cart.some(p => p.id === prod.id) ? (
            <Button variant='danger'>Remove from cart</Button>
          ) : (
            <Button disabled={!prod.inStock}>
              {!prod.inStock ? 'Out Of Stock' : 'Add to Cart'}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

export default SingleProduct
