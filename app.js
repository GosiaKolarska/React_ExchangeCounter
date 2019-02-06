const Cash = props => {
  const value = (props.cash / props.ratio * props.price).toFixed(2);
  return (
    <div>{props.title}{props.cash <= 0 ? "" : value}</div>
  )
}


class ExchangeCounter extends React.Component {
  state = {
    amount: '',
    product: 'petrol'
  }
  static defaultProps = {
    currencies: [
      {
        id: 0,
        name: 'zlotych',
        ratio: 1,
        title: 'Wartość w PLN: '
      },
      {
        id: 1,
        name: 'dollar',
        ratio: 3.6,
        title: 'Wartość w USD: '
      },
      {
        id: 2,
        name: 'euro',
        ratio: 4.1,
        title: 'Wartość w EUR: '
      },
      {
        id: 3,
        name: 'pound',
        ratio: 4.55,
        title: 'Wartość w GBP: '
      },
    ],
    prices: {
      electricity: .51,
      petrol: 4.5,
      oranges: 3.79,
      paczek: 1.50
    }
  }

  handleChange = (e) => {
    this.setState({
      amount: e.target.value
    })
  }
  handleSelect = (e) => {
    this.setState({
      product: e.target.value,
      amount: ''
    })
  }
  insertSuffix(select) {
    if (select === 'electricity') return <em> kWh</em>
    else if (select === 'petrol') return <em> l</em>
    else if (select === 'oranges') return <em> kg</em>
    else if (select === 'paczek') return <em> szt</em>
    else return null
  }

  selectPrice(select) {
    const price = this.props.prices[select]
    return price
  }

  render() {
    const { amount, product } = this.state;
    const price = this.selectPrice(product)
    const calculators = this.props.currencies.map(currency => (
      <Cash
        key={currency.id}
        ratio={currency.ratio}
        title={currency.title}
        cash={amount}
        price={price}
      />
    ))
    return (
      <div className="app">
        <label>Wybierz produkt:
        <select
            value={product}
            onChange={this.handleSelect}
          >
            <option value="electricity">Prąd</option>
            <option value="petrol">Benzyna</option>
            <option value="oranges">Pomarańcze</option>
            <option value="paczek">Pączek</option>
          </select>
        </label>
        <label>
          <input
            type="number"
            value={this.state.amount}
            onChange={this.handleChange}
          />
          {this.insertSuffix(this.state.product)}
        </label>
        {calculators}
      </div>
    );
  }
}

ReactDOM.render(<ExchangeCounter />, document.getElementById('root'))