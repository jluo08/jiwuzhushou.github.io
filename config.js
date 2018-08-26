// # Ghost Configuration
// Setup your Ghost install for various [environments](http://support.ghost.org/config/#about-environments).

// Ghost runs in `development` mode by default. Full documentation can be found at http://support.ghost.org/config/

var path = require('path'),
	config;
var coding_services = JSON.parse(process.env.VCAP_SERVICES);
var coding_application = JSON.parse(process.env.VCAP_APPLICATION);
config = {
	// ### Production
	// 实际部署时使用的是部署环境，用npm start --production启动应用的。
	// 实际部署推荐使用mysql和七牛的储存只要简单配置一下就好了，这样可以剞劂coding在演示关闭之后，静态资源与用户数据丢失的功能
	production: {
		// 这里其实就是coding演示上的自定义域名
		url: '47.93.254.79',

		mail: {
			transport: 'SMTP',
			options: {
				service: '',
				auth: {
					user: '',
					pass: ''
				}
			}
		},
		/*database: {
			client: 'sqlite3',
			connection: {
				filename: path.join(__dirname, '/content/data/ghost.db')
			},
			debug: false
		},*/

		// 配置MySQL 数据库
		database: {
		    client: 'mysql',
		    connection: {
		        host     : '127.0.0.1', //输入数据库地址
                user     : 'ghost', //输入数据库用户
                password : '', //输入你的 MySQL 密码
                database : 'ghost', //输入数据库名称
                charset  : 'utf8'
		    },
		    debug: false
		},
		// coding 有要求应用运行在0.0.0.0上
		server: {
			host: '127.0.0.1',
			port: '2368',
		},
		//Storage.Now,we can support `qiniu`,`upyun`, `aliyun oss`, `aliyun ace-storage` and `local-file-store`
		// 默认用的是sqlite数据库静态数据会被之间传到服务器上，配置七牛的时候把这个注释掉
		storage: {
			provider: 'local-file-store'
		}

		// or
		// 参考文档： http://www.ghostchina.com/qiniu-cdn-for-ghost/
		// 我们将使用七牛的静态存储，只需要简单申请个账号就可以获得一定的免费空间与内存，如果身份认证通过以后会更多，自己视情况而定
		// 配置七牛的时候请把注释去掉
		/* storage: {
            provider: 'qiniu',
            bucketname: '',//这里填你七牛的空间名
            ACCESS_KEY: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',//填你七牛的账户AK
            SECRET_KEY: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',//填你七牛的账户SK
            root: '/image/',
            prefix: 'http://xxxxxxxxxx.clouddn.com',//填你七牛空间对应的域名
            savelocal: false//设置不往本地存静态数据，因为会造成系统越来越大
        }*/

		// or
		// 参考文档： http://www.ghostchina.com/upyun-cdn-for-ghost/
		/*storage: {
		    provider: 'upyun',
		    bucketname: 'your-bucket-name',
		    username: 'your user name',
		    password: 'your password',
		    root: '/image/',
		    prefix: 'http://your-bucket-name.b0.upaiyun.com'
		}*/

		// or
		// 参考文档： http://www.ghostchina.com/aliyun-oss-for-ghost/
		 /*storage: {
            provider: 'oss',
            bucketname: 'your-bucket-name',
            ACCESS_KEY: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            SECRET_KEY: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            root: '/image/',
            endpoint: 'http://oss-cn-hangzhou.aliyuncs.com',  //阿里云的上传端点是分地域的，需要单独设置
            prefix: 'http://your-bucket-name.oss-cn-hangzhou.aliyuncs.com'
        }*/
	},

	// ### Development **(default)**
	development: {
		// The url to use when providing links to the site, E.g. in RSS and email.
		// Change this to your Ghost blog's published URL.
		url: 'http://localhost:3000',

		mail: {
			transport: 'SMTP',
			options: {
				service: '',
				auth: {
					user: '',
					pass: ''
				}
			}
		},

		// #### Database
		// Ghost supports sqlite3 (default), MySQL & PostgreSQL
		database: {
			client: 'sqlite3',
			connection: {
				filename: path.join(__dirname, '/content/data/ghost.db')
			},
			debug: false
		},
		// #### Server
		// Can be host & port (default), or socket
		server: {
			host: '0.0.0.0',
			port: process.env.VCAP_APP_PORT || 3000,
		},
		// #### Paths
		// Specify where your content directory lives
		paths: {
			contentPath: path.join(__dirname, '/content/')
		}
	},

	// **Developers only need to edit below here**

	// ### Testing
	// Used when developing Ghost to run tests and check the health of Ghost
	// Uses a different port number
	testing: {
		url: 'http://127.0.0.1:2369',
		database: {
			client: 'sqlite3',
			connection: {
				filename: path.join(__dirname, '/content/data/ghost-test.db')
			}
		},
		server: {
			host: '127.0.0.1',
			port: '2369'
		},
		logging: false
	},

	// ### Testing MySQL
	// Used by Travis - Automated testing run through GitHub
	'testing-mysql': {
		url: 'http://127.0.0.1:2369',
		database: {
			client: 'mysql',
			connection: {
				host: '127.0.0.1',
				user: 'root',
				password: '',
				database: 'ghost_testing',
				charset: 'utf8'
			}
		},
		server: {
			host: '127.0.0.1',
			port: '2369'
		},
		logging: false
	},

	// ### Testing pg
	// Used by Travis - Automated testing run through GitHub
	'testing-pg': {
		url: 'http://127.0.0.1:2369',
		database: {
			client: 'pg',
			connection: {
				host: '127.0.0.1',
				user: 'postgres',
				password: '',
				database: 'ghost_testing',
				charset: 'utf8'
			}
		},
		server: {
			host: '127.0.0.1',
			port: '2369'
		},
		logging: false
	}
};

module.exports = config;
