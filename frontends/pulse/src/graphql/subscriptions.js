/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      email
      first_name
      last_name
      DOB
      pic
      sex
      height
      pulseFitnessDevices {
        items {
          id
          uid
          name
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      analytics {
        items {
          id
          analyticID
          userID
          pulseFitnessID
          date_recorded
          stepCountID
          heartRateID
          bloodOxygenID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      email
      first_name
      last_name
      DOB
      pic
      sex
      height
      pulseFitnessDevices {
        items {
          id
          uid
          name
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      analytics {
        items {
          id
          analyticID
          userID
          pulseFitnessID
          date_recorded
          stepCountID
          heartRateID
          bloodOxygenID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      email
      first_name
      last_name
      DOB
      pic
      sex
      height
      pulseFitnessDevices {
        items {
          id
          uid
          name
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      analytics {
        items {
          id
          analyticID
          userID
          pulseFitnessID
          date_recorded
          stepCountID
          heartRateID
          bloodOxygenID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePulseFitnessDevice = /* GraphQL */ `
  subscription OnCreatePulseFitnessDevice {
    onCreatePulseFitnessDevice {
      id
      uid
      name
      userID
      analytics {
        items {
          id
          analyticID
          userID
          pulseFitnessID
          date_recorded
          stepCountID
          heartRateID
          bloodOxygenID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePulseFitnessDevice = /* GraphQL */ `
  subscription OnUpdatePulseFitnessDevice {
    onUpdatePulseFitnessDevice {
      id
      uid
      name
      userID
      analytics {
        items {
          id
          analyticID
          userID
          pulseFitnessID
          date_recorded
          stepCountID
          heartRateID
          bloodOxygenID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePulseFitnessDevice = /* GraphQL */ `
  subscription OnDeletePulseFitnessDevice {
    onDeletePulseFitnessDevice {
      id
      uid
      name
      userID
      analytics {
        items {
          id
          analyticID
          userID
          pulseFitnessID
          date_recorded
          stepCountID
          heartRateID
          bloodOxygenID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateAnalytics = /* GraphQL */ `
  subscription OnCreateAnalytics {
    onCreateAnalytics {
      id
      analyticID
      userID
      pulseFitnessID
      date_recorded
      stepCountID
      heartRateID
      bloodOxygenID
      stepCount {
        id
        step_count
        metrics
        createdAt
        updatedAt
      }
      heartRate {
        id
        heart_rate
        metrics
        createdAt
        updatedAt
      }
      bloodOxygen {
        id
        blood_oxygen
        metrics
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAnalytics = /* GraphQL */ `
  subscription OnUpdateAnalytics {
    onUpdateAnalytics {
      id
      analyticID
      userID
      pulseFitnessID
      date_recorded
      stepCountID
      heartRateID
      bloodOxygenID
      stepCount {
        id
        step_count
        metrics
        createdAt
        updatedAt
      }
      heartRate {
        id
        heart_rate
        metrics
        createdAt
        updatedAt
      }
      bloodOxygen {
        id
        blood_oxygen
        metrics
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAnalytics = /* GraphQL */ `
  subscription OnDeleteAnalytics {
    onDeleteAnalytics {
      id
      analyticID
      userID
      pulseFitnessID
      date_recorded
      stepCountID
      heartRateID
      bloodOxygenID
      stepCount {
        id
        step_count
        metrics
        createdAt
        updatedAt
      }
      heartRate {
        id
        heart_rate
        metrics
        createdAt
        updatedAt
      }
      bloodOxygen {
        id
        blood_oxygen
        metrics
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateStepCount = /* GraphQL */ `
  subscription OnCreateStepCount {
    onCreateStepCount {
      id
      step_count
      metrics
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateStepCount = /* GraphQL */ `
  subscription OnUpdateStepCount {
    onUpdateStepCount {
      id
      step_count
      metrics
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteStepCount = /* GraphQL */ `
  subscription OnDeleteStepCount {
    onDeleteStepCount {
      id
      step_count
      metrics
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHeartRate = /* GraphQL */ `
  subscription OnCreateHeartRate {
    onCreateHeartRate {
      id
      heart_rate
      metrics
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHeartRate = /* GraphQL */ `
  subscription OnUpdateHeartRate {
    onUpdateHeartRate {
      id
      heart_rate
      metrics
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHeartRate = /* GraphQL */ `
  subscription OnDeleteHeartRate {
    onDeleteHeartRate {
      id
      heart_rate
      metrics
      createdAt
      updatedAt
    }
  }
`;
export const onCreateBloodOxygen = /* GraphQL */ `
  subscription OnCreateBloodOxygen {
    onCreateBloodOxygen {
      id
      blood_oxygen
      metrics
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateBloodOxygen = /* GraphQL */ `
  subscription OnUpdateBloodOxygen {
    onUpdateBloodOxygen {
      id
      blood_oxygen
      metrics
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteBloodOxygen = /* GraphQL */ `
  subscription OnDeleteBloodOxygen {
    onDeleteBloodOxygen {
      id
      blood_oxygen
      metrics
      createdAt
      updatedAt
    }
  }
`;
