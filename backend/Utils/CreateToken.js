import jwt from "jsonwebtoken"

const CreateToken = ({userId})=>{
  const Token = jwt.sign({userId}, process.env.JWT_SECRET,{
    expiresIn:'30d',
    
  })

  return Token
}

export default CreateToken