class KeyBoard {

  // Register some keyboard data
  private leftPressed: boolean;
  private upPressed: boolean;
  private rightPressed: boolean;
  private downPressed: boolean;

  constructor() {
    this.leftPressed = false;
    this.upPressed = false;
    this.rightPressed = false;
    this.downPressed = false;

    // Bind the callbacks
    window.addEventListener("keydown", this.keyDownHandler);
    window.addEventListener("keyup", this.keyUpHandler);
  }

  /**
   * Function to handle the key down
   * @param {KeyboardEvent} event 
   */
  private keyDownHandler = (event: KeyboardEvent) => {
    // Process the input of the event 'keydown'

    if (event.keyCode == 37) {
      this.leftPressed = true;
    }
    if (event.keyCode == 38) {
      this.upPressed = true;
    }
    if (event.keyCode == 39) {
      this.rightPressed = true;
    }
    if (event.keyCode == 40) {
      this.downPressed = true;
    }
  }

  /**
    * Function to handle the key up
    * @param {KeyboardEvent} event 
    */
  private keyUpHandler = (event: KeyboardEvent) => {
    // Process the input from the event 'keyup'
    
    if (event.keyCode == 37) {
      this.leftPressed = false;
    }
    if (event.keyCode == 38) {
      this.upPressed = false;
    }
    if (event.keyCode == 39) {
      this.rightPressed = false;
    }
    if (event.keyCode == 40) {
      this.downPressed = false;
    }
  }

  /**
   * Function to get the leftPressed property
   */
  public GetLeftPressed(): boolean {
    return this.leftPressed;
  }

  /**
   * Function to get the upPressed property
   */
  public GetUpPressed(): boolean {
    return this.upPressed;
  }

  /**
   * Function to get the rightPressed property
   */
  public GetRightPressed(): boolean {
    return this.rightPressed;
  }

  /**
   * Function to get the downPressed property
   */
  public GetDownPressed(): boolean {
    return this.downPressed;
  }
} 