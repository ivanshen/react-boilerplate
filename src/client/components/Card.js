import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';

const Cards = ({title, description, price, className}) => (
  <div className={className}>
    <Card>
      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
          {title}
        </Typography>
        <Typography component="p">
          {price}
        </Typography>
        <Typography component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          <FormattedMessage id="moreInfoLabel"></FormattedMessage>
        </Button>
      </CardActions>
    </Card>
  </div>
)

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  className: PropTypes.string,
};

export default Cards;