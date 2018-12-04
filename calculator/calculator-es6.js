class Calculator {
  /**
   * Constructor method
   *
   * Initializes some necessary attributes
   * 
   * @param string expression Represents DOM id element
   * @param string currentNumber Represents DOM id element
   */
  constructor(expression, currentNumber) {
    this._operator = ''
    this._isOperatorSet = false
    this._isEqualPressed = false
    this._lastCalculatedNumber = null
    this._allowdOperators = ['+', '-', '*', '/', '.']
    this._expression = document.getElementById(expression)
    this._currentNumber = document.getElementById(currentNumber)
  }

  add(x, y) {
    return x + y
  }

  subtract(x, y) {
    return x - y
  }

  multiply(x, y) {
    return x * y
  }

  divide(x, y) {
    if (y === '0') {
      alert('Can not divide by zero')
      return
    }

    return x / y
  }

  setNumber(event) {
    // Epmties current number
    const oneOfThese = this._isEqualPressed === true ||
      this._isOperatorSet === true ||
      this._currentNumber.innerHTML === '0'

    if (oneOfThese) {
      this._setCurrentNumber('')
      this._isOperatorSet = false
    }

    // Sets current number and expression
    const number = event.target ? event.target : event.srcElement
    this._setCurrentNumber(this._currentNumber.innerHTML + number.innerHTML)
    this._setExpression(this._expression.innerHTML + number.innerHTML)
  }

  setOperator(operator) {
    if (operator === '=') {
      // Raises alert for invalid expression
      if (this._isExpressionInvalid()) {
        alert('Malformed expression')
        return
      }

      // Ensures equal operator pressed
      this._isEqualPressed = true

      // Calculates and empties expression
      this._calculate()
      this._setExpression('')
      return
    }

    // Calcuates current expression
    if (!this._isEqualPressed)
      this._calculate()

    this._operator = operator
    this._isOperatorSet = true
    this._isEqualPressed = false
    this._lastCalculatedNumber = parseFloat(this._currentNumber.innerHTML)

    // Prepares and sets the expression
    const expression = this._expression.innerHTML === '' ?
      `${this._currentNumber.innerHTML}${this._operator}` :
      `${this._expression.innerHTML}${this._operator}`

    this._setExpression(expression)
  }

  // Clears result
  clear() {
    this._operator = ''
    this._isEqualPressed = false
    this._lastCalculatedNumber = null
    this._setExpression('')
    this._setCurrentNumber('0')
  }

  // Maintains expression
  _setExpression(expression) {
    this._expression.innerHTML = expression
  }

  // Checks expression's validity
  _isExpressionInvalid() {
    const pattern = /[\+\-\*\/\.]{2,}|[\+\-\*\/\.]{1}$/gm
    return pattern.test(this._expression.innerHTML)
  }

  // Handles current number being used by the user
  _setCurrentNumber(number) {
    this._currentNumber.innerHTML = number
  }

  // Performs specific action for the result
  _calculate() {
    if (!this._operator || this._lastCalculatedNumber === null) return

    let result = 0
    const number = parseFloat(this._currentNumber.innerHTML)

    // Decides action to be called depending on operators
    switch (this._operator) {
      case '+':
        result = this.add(this._lastCalculatedNumber, number)
        break
      case '-':
        result = this.subtract(this._lastCalculatedNumber, number)
        break
      case '*':
        result = this.multiply(this._lastCalculatedNumber, number)
        break
      case '/':
        result = this.divide(this._lastCalculatedNumber, number)
        break
    }

    // Sets result and empties calculated number
    this._setCurrentNumber(result)
    this._lastCalculatedNumber = result
  }
}