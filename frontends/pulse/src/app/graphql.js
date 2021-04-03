import gql from "graphql-tag";

//mutations
const createUser = gql`
  mutation(
    $username: String!
    $first_name: String!
    $last_name: String!
    $DOB: AWSDate!
    $sex: Sex!
    $height: Float!
  ) {
    createUser(
      input: {
        username: $username
        first_name: $first_name
        last_name: $last_name
        DOB: $DOB
        sex: $sex
        height: $height
      }
    ) {
      id
      username
      createdAt
    }
  }
`;

const userByEmail = gql`
  query userByEmail($email: String!) {
    userByEmail(email: $email) {
      items {
        id
        email
        first_name
        last_name
        DOB
        sex
        height
      }
    }
  }
`;

export { userByEmail };
