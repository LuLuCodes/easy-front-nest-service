# Changelog

## [6.1.0](https://github.com/LuLuCodes/easy-front-nest-service/compare/v6.0.0...v6.1.0) (2026-05-12)


### Features

* **openapi:** export openapi.json as ci artifact (P25) ([#99](https://github.com/LuLuCodes/easy-front-nest-service/issues/99)) ([c3fe898](https://github.com/LuLuCodes/easy-front-nest-service/commit/c3fe898431a3ce5afdd438f4d0ae394a9e222335))

## [6.0.0](https://github.com/LuLuCodes/easy-front-nest-service/compare/v5.0.0...v6.0.0) (2026-05-12)


### ⚠ BREAKING CHANGES

* **entities:** break User ↔ UserLogin SWC circular init (P14) ([#87](https://github.com/LuLuCodes/easy-front-nest-service/issues/87))
* **framework:** NestJS 10 → 11 + Fastify 4 → 5 (P10) ([#83](https://github.com/LuLuCodes/easy-front-nest-service/issues/83))
* **http:** migrate adapter Express → Fastify (P9) ([#82](https://github.com/LuLuCodes/easy-front-nest-service/issues/82))
* **infra:** multi-stage Distroless image + Docker workflow + healthcheck (P6) ([#69](https://github.com/LuLuCodes/easy-front-nest-service/issues/69))
* **auth:** tenant-aware login + tenant-scoped reads (P5-2) ([#61](https://github.com/LuLuCodes/easy-front-nest-service/issues/61))
* **auth:** replaces session+MD5-sign authentication with JWT+Passport. Major version bump to 5.0.0. Clients must update to use Authorization: Bearer + refresh cookie or body fallback.

### Features

* Add custom date string validator ([f2a5795](https://github.com/LuLuCodes/easy-front-nest-service/commit/f2a57957ab76f7bc7e24735e287f25bba9e7fe94))
* Add support for evaluating complex expressions in Calculated class ([6649d91](https://github.com/LuLuCodes/easy-front-nest-service/commit/6649d91ba660ad3c6803e719d10fe1ffaa3b6d0a))
* **alipay:** introduce AlipayProvider via alipay-sdk@4 (P5-7) ([#66](https://github.com/LuLuCodes/easy-front-nest-service/issues/66)) ([049f936](https://github.com/LuLuCodes/easy-front-nest-service/commit/049f936d7a3171f26de313031cdb3abb7bae7d9d))
* **api:** uri versioning with v1 + version-neutral defaults (P21) ([#94](https://github.com/LuLuCodes/easy-front-nest-service/issues/94)) ([be8bfdb](https://github.com/LuLuCodes/easy-front-nest-service/commit/be8bfdb941630bf5983442fb93b89b41ec6bf365))
* **auth:** apply @Public/@Permissions across modules + docs (P4-3) ([#58](https://github.com/LuLuCodes/easy-front-nest-service/issues/58)) ([3ee7acc](https://github.com/LuLuCodes/easy-front-nest-service/commit/3ee7acc52334fb40c12c8aaf96a0750b3f243740))
* **auth:** e2e baseline + Passport/JWT skeleton (P4-0 + P4-1) ([#53](https://github.com/LuLuCodes/easy-front-nest-service/issues/53)) ([a697df0](https://github.com/LuLuCodes/easy-front-nest-service/commit/a697df00dadb407f09d6460fc736e1870d8b586a))
* **auth:** hard cutover to JWT, drop session+MD5 (P4-2) ([#57](https://github.com/LuLuCodes/easy-front-nest-service/issues/57)) ([8741af9](https://github.com/LuLuCodes/easy-front-nest-service/commit/8741af9c122e38768e1368c362cebd8ec3614728))
* **auth:** tenant-aware login + tenant-scoped reads (P5-2) ([#61](https://github.com/LuLuCodes/easy-front-nest-service/issues/61)) ([fa4cad2](https://github.com/LuLuCodes/easy-front-nest-service/commit/fa4cad2eb1417a4c19a613106856306c5e62dca9))
* **database:** introduce TypeORM infrastructure + migrate 4 simple services (P3-1) ([#50](https://github.com/LuLuCodes/easy-front-nest-service/issues/50)) ([715c386](https://github.com/LuLuCodes/easy-front-nest-service/commit/715c386adf5ea9ef81e083cf53e4970502dd07a6))
* **framework:** NestJS 10 → 11 + Fastify 4 → 5 (P10) ([#83](https://github.com/LuLuCodes/easy-front-nest-service/issues/83)) ([8cab012](https://github.com/LuLuCodes/easy-front-nest-service/commit/8cab012647355b68b462e27fb51743002d92b06a))
* **health:** add /health/ready terminus probe for DB + Redis (P13) ([#86](https://github.com/LuLuCodes/easy-front-nest-service/issues/86)) ([f0ce5b2](https://github.com/LuLuCodes/easy-front-nest-service/commit/f0ce5b2d57676367ffb6eaad2d2c3a23ce64e7ba))
* **http:** migrate adapter Express → Fastify (P9) ([#82](https://github.com/LuLuCodes/easy-front-nest-service/issues/82)) ([8503d93](https://github.com/LuLuCodes/easy-front-nest-service/commit/8503d93ca2dc8cfe801651814b30ff6d03bcf79c))
* **infra:** multi-stage Distroless image + Docker workflow + healthcheck (P6) ([#69](https://github.com/LuLuCodes/easy-front-nest-service/issues/69)) ([3c5bab3](https://github.com/LuLuCodes/easy-front-nest-service/commit/3c5bab36bf536365dedbea2e3cedd17b9c41b03f))
* **observability:** opentelemetry tracing + per-tenant span attrs (P20) ([#93](https://github.com/LuLuCodes/easy-front-nest-service/issues/93)) ([5fd0604](https://github.com/LuLuCodes/easy-front-nest-service/commit/5fd0604d3a80628986592be5dd166150cd534c80))
* **tenant:** control-plane schemas, credential vault + REST (P5-1) ([#60](https://github.com/LuLuCodes/easy-front-nest-service/issues/60)) ([d2254a6](https://github.com/LuLuCodes/easy-front-nest-service/commit/d2254a6aced5c0f196433d4b31fdf20094fa0a4d))
* **tenant:** credential vault + provider base layer (P5-3) ([#62](https://github.com/LuLuCodes/easy-front-nest-service/issues/62)) ([60608cb](https://github.com/LuLuCodes/easy-front-nest-service/commit/60608cbc3d09594acd725c04432d2ea1891f0e2d))
* **tenant:** introduce tenant context + audit-entity tenant_id (P5-0) ([#59](https://github.com/LuLuCodes/easy-front-nest-service/issues/59)) ([29621e5](https://github.com/LuLuCodes/easy-front-nest-service/commit/29621e581c17b3b1d95512f8a7049cef23ce3f39))
* **throttler:** per-tenant rate-limit buckets (P22) ([#95](https://github.com/LuLuCodes/easy-front-nest-service/issues/95)) ([fa091b7](https://github.com/LuLuCodes/easy-front-nest-service/commit/fa091b7a8aab7ca36ad4a50e43ad28b7394e80d0))
* **wx-mp:** rewrite WeChat 小程序 SDK + share access-token store (P5-5) ([#64](https://github.com/LuLuCodes/easy-front-nest-service/issues/64)) ([9c40876](https://github.com/LuLuCodes/easy-front-nest-service/commit/9c40876d1c5875fdc168e9f6a860d6896a70e802))
* **wx-oa:** rewrite WeChat 公众号 SDK from scratch (P5-4) ([#63](https://github.com/LuLuCodes/easy-front-nest-service/issues/63)) ([43da777](https://github.com/LuLuCodes/easy-front-nest-service/commit/43da777be3e50f59a3968f7880c78a903bb0afcc))
* **wx-pay:** rewrite WeChat Pay v3 SDK from scratch (P5-6) ([#65](https://github.com/LuLuCodes/easy-front-nest-service/issues/65)) ([42e43ac](https://github.com/LuLuCodes/easy-front-nest-service/commit/42e43acb09daafe4f9937e1f1d187cc8de092a78))
* 增加环境变量数组解析功能 ([e7f3d5a](https://github.com/LuLuCodes/easy-front-nest-service/commit/e7f3d5a94530e8f8bdf37a9046acc7985cd92101))
* 添加密码强度检查功能 ([8e618b5](https://github.com/LuLuCodes/easy-front-nest-service/commit/8e618b5274d7953c5b02bc6eb5b37cf0f9bac891))
* 添加数字验证码生成器 ([8c0dc88](https://github.com/LuLuCodes/easy-front-nest-service/commit/8c0dc8826dce428c1f2588351636d8e7a9a410a5))


### Bug Fixes

* **entities:** break User ↔ UserLogin SWC circular init (P14) ([#87](https://github.com/LuLuCodes/easy-front-nest-service/issues/87)) ([e96720e](https://github.com/LuLuCodes/easy-front-nest-service/commit/e96720e869270629662b12f5e8c1f296330f283e))
* 优化envArray函数以处理空字符串 ([2283b80](https://github.com/LuLuCodes/easy-front-nest-service/commit/2283b8075f73f2798eb7cee7f75784002c1082b5))


### Code Refactoring

* **access:** migrate access.service.ts to TypeORM (P3-2) ([#51](https://github.com/LuLuCodes/easy-front-nest-service/issues/51)) ([b08e005](https://github.com/LuLuCodes/easy-front-nest-service/commit/b08e005d2bee7ee236f7a008626522d310e4136b))
* extract bootstrap modules and split BaseDTO (P1) ([#14](https://github.com/LuLuCodes/easy-front-nest-service/issues/14)) ([879ca96](https://github.com/LuLuCodes/easy-front-nest-service/commit/879ca96c26227a43e3f462355e6d35c7976643e6))
* migrate Bull to BullMQ, drop dead api-log queue (P2-B) ([#48](https://github.com/LuLuCodes/easy-front-nest-service/issues/48)) ([a0d5139](https://github.com/LuLuCodes/easy-front-nest-service/commit/a0d51398f9d7135a4c3c2348783494f9bc25ba3b))
* **oss:** rewrite OSS as tenant-aware Provider on ali-oss directly (P5-8) ([#67](https://github.com/LuLuCodes/easy-front-nest-service/issues/67)) ([2e6dfb6](https://github.com/LuLuCodes/easy-front-nest-service/commit/2e6dfb6dd3eaa9248fe538773d39307799ee64a2))
* own ioredis provider + rewrite CacheService (P2-C) ([#49](https://github.com/LuLuCodes/easy-front-nest-service/issues/49)) ([c891aba](https://github.com/LuLuCodes/easy-front-nest-service/commit/c891aba0f6d011dbbabe06c474c6824a683ed2da))
* replace log4js with pino + NestJS Logger (P2-A) ([#47](https://github.com/LuLuCodes/easy-front-nest-service/issues/47)) ([1ccdf0e](https://github.com/LuLuCodes/easy-front-nest-service/commit/1ccdf0e1fb7e00e54ac1d1a0fbda355cfcb88899))
* 优化 oss.ts 配置文件 ([6675f26](https://github.com/LuLuCodes/easy-front-nest-service/commit/6675f265e5143fc88734c2856b88754317f59a56))
* 优化密码加密算法的迭代次数和长度 ([7f8dbf3](https://github.com/LuLuCodes/easy-front-nest-service/commit/7f8dbf344b1184b6649114882a69130e5d19fd85))
* 优化跨域配置 ([99fa3b5](https://github.com/LuLuCodes/easy-front-nest-service/commit/99fa3b53ba33fd0a31c01b8b248882d3b2ebf3d2))
* 使用sha256算法加密密码 ([ddfdbe7](https://github.com/LuLuCodes/easy-front-nest-service/commit/ddfdbe77f3e910f97c7f2b14b01283ebb1ec4dd8))
* 使用sm3算法加密密码 ([8853dbe](https://github.com/LuLuCodes/easy-front-nest-service/commit/8853dbe524b57c62af538808c5b154d8982694c9))
* 添加jsdom依赖并实现MarkdownToText和convert_html_to_ppt功能 ([26b6439](https://github.com/LuLuCodes/easy-front-nest-service/commit/26b64396ee0ecc63b5ba31b441954de8a74dd5cf))
* 添加缓存过期功能 ([35cb7da](https://github.com/LuLuCodes/easy-front-nest-service/commit/35cb7dac436db7caea1858468433a0026ad13401))


### Documentation

* **p8:** bun spike → deferred (decision record) ([#71](https://github.com/LuLuCodes/easy-front-nest-service/issues/71)) ([e71ef32](https://github.com/LuLuCodes/easy-front-nest-service/commit/e71ef32d2599e23c1c101031ea1f48ea5fefb864))


### Tests

* **coverage:** push global gate 50% → 60% via 61 new specs (P18) ([#91](https://github.com/LuLuCodes/easy-front-nest-service/issues/91)) ([3313a83](https://github.com/LuLuCodes/easy-front-nest-service/commit/3313a839816c20a6efd12ec5cf31c76db42d03c8))
* **p7:** coverage threshold gate at 50% + integration job + 28 new spec files ([#70](https://github.com/LuLuCodes/easy-front-nest-service/issues/70)) ([b3deddb](https://github.com/LuLuCodes/easy-front-nest-service/commit/b3deddbdab75b4dedb07cf3195d436ecad67cbee))


### Miscellaneous Chores

* Add @nestjs/throttler dependency and configure throttling settings ([07371f4](https://github.com/LuLuCodes/easy-front-nest-service/commit/07371f40d8314437b6df4374b46784073776d8a4))
* Add mathjs and vm dependencies, and implement executeFunction and Calculated classes ([4fb183f](https://github.com/LuLuCodes/easy-front-nest-service/commit/4fb183f923e017e69627f5178424f0cdaf9e26f6))
* Add new module aliases and update package.json ([fd0180e](https://github.com/LuLuCodes/easy-front-nest-service/commit/fd0180edba8ebc5ec33585c649e1d0226d78cd37))
* bootstrap modern tooling and PR workflow (P0) ([#1](https://github.com/LuLuCodes/easy-front-nest-service/issues/1)) ([fef16cd](https://github.com/LuLuCodes/easy-front-nest-service/commit/fef16cd02ba36a6f12c9bbdab61987c65a5fb7b5))
* **ci:** ignore major bumps and to-be-removed deps in Dependabot ([#28](https://github.com/LuLuCodes/easy-front-nest-service/issues/28)) ([f713af3](https://github.com/LuLuCodes/easy-front-nest-service/commit/f713af33681d31574f861061b0c7f163493acad7))
* **ci:** make Dependabot use Conventional Commits prefix ([#20](https://github.com/LuLuCodes/easy-front-nest-service/issues/20)) ([d18143a](https://github.com/LuLuCodes/easy-front-nest-service/commit/d18143a6f0bfe84d83f14b20f7cd728d8a2a460d))
* **ci:** patch Dependabot ignore — add @eslint/* scope glob ([#39](https://github.com/LuLuCodes/easy-front-nest-service/issues/39)) ([a28f517](https://github.com/LuLuCodes/easy-front-nest-service/commit/a28f51705b7e1c829eac79fa988b0f95cbf232b3))
* **ci:** tune CodeQL — security-extended + paths-ignore ([#19](https://github.com/LuLuCodes/easy-front-nest-service/issues/19)) ([a5d0eb2](https://github.com/LuLuCodes/easy-front-nest-service/commit/a5d0eb2f5fe74cdd87ec65d988613b22c83a61bc))
* **cleanup:** remove dead deps + lib files + minor lints (P15) ([#88](https://github.com/LuLuCodes/easy-front-nest-service/issues/88)) ([f873777](https://github.com/LuLuCodes/easy-front-nest-service/commit/f873777f3a4d114bf01d99633047a9e685c153e0))
* **database:** remove Sequelize and generator tooling (P3-3) ([#52](https://github.com/LuLuCodes/easy-front-nest-service/issues/52)) ([5741241](https://github.com/LuLuCodes/easy-front-nest-service/commit/574124114a3f51c1e441bf76ec94040dd06e2aa6))
* **deps-dev:** bump @types/node in the types group ([#40](https://github.com/LuLuCodes/easy-front-nest-service/issues/40)) ([ae77f9c](https://github.com/LuLuCodes/easy-front-nest-service/commit/ae77f9ce897c8b68f66492058780b518fa51e846))
* **deps-dev:** bump @types/supertest ([#38](https://github.com/LuLuCodes/easy-front-nest-service/issues/38)) ([d1a5cae](https://github.com/LuLuCodes/easy-front-nest-service/commit/d1a5caec03e83875654ce2e6811a87f6b951cf39))
* **deps-dev:** bump commitizen from 4.3.0 to 4.3.1 ([#30](https://github.com/LuLuCodes/easy-front-nest-service/issues/30)) ([fa12a18](https://github.com/LuLuCodes/easy-front-nest-service/commit/fa12a18d1be3234940267d2f32331085004fe9c2))
* **deps-dev:** bump cz-customizable from 7.2.1 to 7.5.4 ([#13](https://github.com/LuLuCodes/easy-front-nest-service/issues/13)) ([b472c7c](https://github.com/LuLuCodes/easy-front-nest-service/commit/b472c7c0f85d765d8787c410efb86b0d7267b05f))
* **deps-dev:** bump globals from 15.15.0 to 17.6.0 ([#29](https://github.com/LuLuCodes/easy-front-nest-service/issues/29)) ([e10322e](https://github.com/LuLuCodes/easy-front-nest-service/commit/e10322e65539ad89a6e5943b76be8c5e4c9218e7))
* **deps-dev:** bump shx from 0.3.4 to 0.4.0 ([#25](https://github.com/LuLuCodes/easy-front-nest-service/issues/25)) ([2d56221](https://github.com/LuLuCodes/easy-front-nest-service/commit/2d56221db1859f6abe2b596c6edcea2c439368f6))
* **deps-dev:** bump the eslint group with 2 updates ([#41](https://github.com/LuLuCodes/easy-front-nest-service/issues/41)) ([f1e111a](https://github.com/LuLuCodes/easy-front-nest-service/commit/f1e111a0f8c4cb77b92cf71613027c175923c9bd))
* **deps-dev:** bump ts-loader from 9.5.1 to 9.5.7 ([#32](https://github.com/LuLuCodes/easy-front-nest-service/issues/32)) ([5796de3](https://github.com/LuLuCodes/easy-front-nest-service/commit/5796de330e612826bda240883288b9c4b0cd1606))
* **deps:** batch dev + runtime bumps (P11) ([#84](https://github.com/LuLuCodes/easy-front-nest-service/issues/84)) ([c93801f](https://github.com/LuLuCodes/easy-front-nest-service/commit/c93801f8259f6fb75654d65664ea887135f46d91))
* **deps:** bump actions/labeler from 5 to 6 ([#35](https://github.com/LuLuCodes/easy-front-nest-service/issues/35)) ([e9f6c83](https://github.com/LuLuCodes/easy-front-nest-service/commit/e9f6c835f578608f986f6cb25ea32f417e73d517))
* **deps:** bump ali-oss and @types/ali-oss ([#45](https://github.com/LuLuCodes/easy-front-nest-service/issues/45)) ([8936c51](https://github.com/LuLuCodes/easy-front-nest-service/commit/8936c5162534f408d71d6e81a48debb323a8704b))
* **deps:** bump compression and @types/compression ([#46](https://github.com/LuLuCodes/easy-front-nest-service/issues/46)) ([2d57f76](https://github.com/LuLuCodes/easy-front-nest-service/commit/2d57f76449d56976bdb697f890ab540a5042bca6))
* **deps:** bump dayjs from 1.11.12 to 1.11.20 ([#17](https://github.com/LuLuCodes/easy-front-nest-service/issues/17)) ([8d76cc0](https://github.com/LuLuCodes/easy-front-nest-service/commit/8d76cc0c1bd5b6da3729f884398073e08ea684fa))
* **deps:** bump github/codeql-action from 3 to 4 ([#4](https://github.com/LuLuCodes/easy-front-nest-service/issues/4)) ([d67134c](https://github.com/LuLuCodes/easy-front-nest-service/commit/d67134c533a327853f238361796dbeb84973aa17))
* **deps:** bump ioredis from 5.4.1 to 5.10.1 ([#26](https://github.com/LuLuCodes/easy-front-nest-service/issues/26)) ([cdb433d](https://github.com/LuLuCodes/easy-front-nest-service/commit/cdb433ddf8822c9af4ec047f24211e3517f773e1))
* **deps:** bump nestjs-throttler-storage-redis from 0.5.0 to 0.5.1 ([#12](https://github.com/LuLuCodes/easy-front-nest-service/issues/12)) ([74b9c47](https://github.com/LuLuCodes/easy-front-nest-service/commit/74b9c47e1e06fb2ed2a6c3f08295f43bcfd8f078))
* **deps:** bump rxjs from 7.8.1 to 7.8.2 ([#43](https://github.com/LuLuCodes/easy-front-nest-service/issues/43)) ([1af91c2](https://github.com/LuLuCodes/easy-front-nest-service/commit/1af91c215ad6292afb4142ec404167c5f9252ccd))
* **deps:** bump the nestjs group across 1 directory with 10 updates ([#36](https://github.com/LuLuCodes/easy-front-nest-service/issues/36)) ([223f61f](https://github.com/LuLuCodes/easy-front-nest-service/commit/223f61fbf927cb9fa8b60474747a512e6230a969))
* **deps:** drop dead deps + crypto.randomUUID (P12) ([#85](https://github.com/LuLuCodes/easy-front-nest-service/issues/85)) ([ff0fd3a](https://github.com/LuLuCodes/easy-front-nest-service/commit/ff0fd3a2b77f50429c20d1a02c505522779b0208))
* **deps:** swap throttler-storage-redis for maintained fork (P16) ([#89](https://github.com/LuLuCodes/easy-front-nest-service/issues/89)) ([70671ea](https://github.com/LuLuCodes/easy-front-nest-service/commit/70671ea0fcc478dec1bdc825b43689290481da08))
* **dto:** drop [@deprecated](https://github.com/deprecated) markers from BaseDTO aggregates (P17) ([#90](https://github.com/LuLuCodes/easy-front-nest-service/issues/90)) ([a7bf55e](https://github.com/LuLuCodes/easy-front-nest-service/commit/a7bf55e3f353d95e6f89d65e35ae38e82443282d))
* **p5-9:** drop final core-sdk dep, tenant isolation e2e + docs ([#68](https://github.com/LuLuCodes/easy-front-nest-service/issues/68)) ([8a6197e](https://github.com/LuLuCodes/easy-front-nest-service/commit/8a6197ed59e4c41f456ae6c5900e3480ea22775c))
* **ts:** turn on strictNullChecks + noImplicitAny + strictBindCallApply (P19) ([#92](https://github.com/LuLuCodes/easy-front-nest-service/issues/92)) ([58ef093](https://github.com/LuLuCodes/easy-front-nest-service/commit/58ef093b1937622772207e5d7a018efb4e0fbb02))
* Update execute-fun.ts to use eval for code execution in browser environment ([93f80a3](https://github.com/LuLuCodes/easy-front-nest-service/commit/93f80a3f768992f9064b96b9b5bdfbe2e15fda20))
* Update header name in guard files to 'x-from-source' ([96bb8fe](https://github.com/LuLuCodes/easy-front-nest-service/commit/96bb8fe9e3949cd503cf5598685fb1d8c19caaa9))
* Update main.ts to include a Buddha ASCII art ([71a0938](https://github.com/LuLuCodes/easy-front-nest-service/commit/71a0938189effe36f21990271f03c4da1fb23e35))
* Update Redis configuration for throttler store ([390d021](https://github.com/LuLuCodes/easy-front-nest-service/commit/390d02158477d402b2cc96800725598f3d6278a4))
* Update Redis configuration for throttler store ([59acb73](https://github.com/LuLuCodes/easy-front-nest-service/commit/59acb734aaafdf8a89693730739123fa19cbc961))
* Update Redis configuration for throttler store ([953044c](https://github.com/LuLuCodes/easy-front-nest-service/commit/953044c511050adab91efff341f5fe117d2ac629))
