import * as React from "react"

interface AppProps {
  exampleStringProp: string
  exampleBooleanProp?: boolean
}

export default function ComponentTemplate({
  exampleStringProp,
  exampleBooleanProp = false
}: AppProps) {
  return (
    <div>
        {exampleBooleanProp && <p>{exampleStringProp}</p>}
    </div>
  );
}