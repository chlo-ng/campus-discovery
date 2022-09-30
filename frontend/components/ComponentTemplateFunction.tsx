import * as React from "react"

interface AppProps {
  exampleStringProp: string
  exampleBooleanProp?: boolean
}

export default function ComponentTemplateFunction({
  exampleStringProp,
  exampleBooleanProp = false
}: AppProps) {
  const [exampleStringState, setExampleStringState] = React.useState<string>(" example string state");
  return (
    <div>
      {exampleBooleanProp && <p>{exampleStringProp + exampleStringState}</p>}
    </div>
  );
}