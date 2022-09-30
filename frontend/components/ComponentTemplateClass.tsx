import * as React from "react"

type Props = {
  exampleStringProp: string
}

type State = {
  exampleStringState: string
}

class ComponentTemplateClass extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      exampleStringState: "component template class state"
    }
  }

  render() {
    return (
      <div>
        <p>{this.props.exampleStringProp}</p>
        <p>{this.state.exampleStringState}</p>
      </div>
    )
  }
}

export default ComponentTemplateClass