import * as convict from 'convict';

interface IConfig {
  env: string;
  version: string;
  tokenSecret: string;
  server: {
    port: number;
    frontendURL: string;
    passwordSalt: string;
    tokenExpiry: string;
    resetHashExpiry: number;
  };
  postgres: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    url: string;
  };
  apiAccessKeys: {
    app: string;
  };
  email: {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    password: string;
  };
  cloudinary: {
    name: string;
    apiKey: string;
    apiSecret: string;
    env: string;
  };
  sendgrid: {
    key: string;
  };
  fcm: {
    serverKey: string;
  };
  realTimeIntervalInMin: number;
  appVersion: number;
}

const config = convict<IConfig>({
  env: {
    format: ['production', 'staging', 'qa', 'development', 'local', 'test'],
    env: 'NODE_ENV',
    arg: 'node-env',
    default: 'development'
  },
  version: {
    format: String,
    default: 'unknown'
  },
  tokenSecret: {
    format: String,
    default: ''
  },
  server: {
    port: {
      format: 'port',
      default: 3000
    },
    frontendURL: {
      format: String,
      default: 'http://localhost:4200'
    },
    passwordSalt: {
      format: String,
      default: ''
    },
    tokenExpiry: {
      format: String,
      default: '1w'
    },
    resetHashExpiry: {
      format: Number,
      default: 4
    }
  },
  postgres: {
    host: {
      format: String,
      default: 'localhost'
    },
    port: {
      format: 'port',
      default: 5432
    },
    username: {
      format: String,
      default: 'postgres'
    },
    password: {
      format: String,
      default: 'postgres'
    },
    database: {
      format: String,
      default: 'postgres'
    },
    url: {
      format: String,
      default: ''
    }
  },
  apiAccessKeys: {
    app: {
      format: String,
      default: '123456'
    }
  },
  email: {
    host: {
      format: String,
      default: ''
    },
    port: {
      format: Number,
      default: 465
    },
    secure: {
      format: Boolean,
      default: true
    },
    user: {
      format: String,
      default: ''
    },
    password: {
      format: String,
      default: ''
    }
  },
  cloudinary: {
    name: {
      format: String,
      default: ''
    },
    apiKey: {
      format: String,
      default: ''
    },
    apiSecret: {
      format: String,
      default: ''
    },
    env: {
      format: String,
      default: ''
    }
  },
  sendgrid: {
    key: {
      format: String,
      default: ''
    }
  },
  fcm: {
    serverKey: {
      format: String,
      default: ''
    }
  },
  realTimeIntervalInMin: {
    format: Number,
    default: 2
  },
  appVersion: {
    format: Number,
    default: 0
  }
});

const env = config.get('env');
config.loadFile(__dirname + '/env/' + env + '.json');

config.validate({ allowed: 'strict' });

export default config.getProperties();
