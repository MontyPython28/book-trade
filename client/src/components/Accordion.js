import React from "react";

class Accordion extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        expanded: true
      };
      
      this.toggleCardState = this.toggleCardState.bind(this);
    }
    
    toggleCardState(e) {      
      this.setState({
        "expanded": !this.state.expanded
      });
    }
    
    render() {
      const {title, children} = this.props;
      const {expanded} = this.state;
      
      return(
          <div className="card is-full">
            <header className="card-header" onClick={this.toggleCardState}>
              <p className="card-header-title">
                {title}
              </p>
              <div className="card-header-icon">
                <span className="icon">
                  <i className={expanded ? "fa fa-angle-down" : "fa fa-angle-up"}></i>
                </span>
              </div>
            </header>
            {expanded ? (
            <div className="box" ref={(content) => this.content = content }>
                {children}
            </div>) : (<div></div>) }
          </div>
      );
    }
  }

  export default Accordion;