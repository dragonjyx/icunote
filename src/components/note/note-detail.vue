<template>

  <el-container class="icu-article-detail">
    <el-header>

      <el-row>

        <el-col :span="1" class="icu-broswer">
          <i class="el-icon-s-promotion" @click="go2HomePage()"></i>
        </el-col>

        <el-col :span="10" class="icu-editor-title">
          <span class="main-title">DRAGON-Yeah</span><span class="seperate">&nbsp;&nbsp;/&nbsp;&nbsp;</span>
          <span class="main-title">互联网面试题</span><span class="seperate">&nbsp;&nbsp;/&nbsp;&nbsp;</span>
          <span class="main-title">互联网面试题</span><span class="seperate">&nbsp;&nbsp;/&nbsp;&nbsp;</span>
          <span class="sec-title">Redis核心知识点</span>
        </el-col>


        <el-col :span="4" :offset="5">
          <div class="header-menu">
            <el-input
              @keyup.enter.native="doQuery()"
              placeholder="请输入搜索内容"
              v-model="queryInput">
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
        </el-col>

        <el-col :span="1" :offset="1" class="icu-article-save">
          <el-button size="mini">收藏</el-button>
        </el-col>
        <el-col :span="1" class="icu-article-publish">
          <el-button type="primary" size="mini">编辑</el-button>
        </el-col>
        <el-col :span="1" class="icu-article-more">
          <el-dropdown @command="selectMore">
                  <span class="el-dropdown-link">
                    <i class="el-icon-more-outline"></i>
                  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="0">
                <i class="el-icon-top-left">&nbsp;&nbsp;导出PDF</i>
              </el-dropdown-item>
              <el-dropdown-item command="1">
                <i class="el-icon-delete">&nbsp;&nbsp;删除</i>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>


      </el-row>

    </el-header>
    <div class="header-holder"></div>

    <el-main>

      <div class="icu-content">


        <div class="icu-article-content-editor">
          <div class="icu-article-content-title">
            Redis核心知识点
          </div>
          <div class="simditor-body" contenteditable="true"><h1 id="1fy0ivmrsp2"> 1.Redis 持久化机制</h1><p>&nbsp; &nbsp; &nbsp;Redis是一个支持持久化的内存数据库，通过持久化机制把内存数据同步到硬盘文件，从而保证数据持久化。当Redis重启之后，通过把硬盘文件重新 加载到内存，就能达到恢复数据的目的。</p><p> &nbsp; &nbsp; &nbsp;实现原理：单独创建fork()一个子进程，将当前父进程的数据库数据复制到子进程的内存中，然后由子进程写到临时文件中，持久化的过程结束了，再用这个临时文件替换上次的快照文件，然后子进程退出，内存释放。</p><p><img src="https://cdn.nlark.com/yuque/0/2020/png/1166905/1591420681170-b099eac3-1506-4808-acae-0650e9d35716.png" alt="image.png"></p><p>持久快两种方式： <span style=""><strong>RDB</strong></span>  和  <span style=""><strong>AOF</strong></span></p><p><span style=""><strong>RDB</strong></span>是Redis默认的持久化方式。按照一定的时间周期策略把内存的数据以快照的形式保存到硬盘的二进制文件。即Snapshot快照存储，对应生产的数据文件为dump.rdb,通过配置文件中的save参数来定义快照的周期（快照可以是其所表示的数据的一个副本，也可以是数据的一个复制品）</p><p><span style=""><strong>AOF</strong></span>：Redis会将每一个收到的写命令都通过Write函数追加到文件的最后，类似与Mysql的binlog。当Redis重启是回通过重新执行文件中保存的写命令来再内存中重建整个数据库的内容。</p><p>注意：当两种方式同事开始时，数据回复Redis会优先选择AOF方式进行恢复。</p><h1 id="urwbtkm84ee"> 2.缓存雪崩、缓存穿透、缓存预热、缓存更新、缓存降级</h1><p><span style=""><strong>缓存雪崩：</strong></span> 由于原有的缓存失效，新的缓存未到期间（例如：我们设置了缓存时采用了相同的过期时间，在同一时刻出现大面积的缓存过期），所有原本应该访问内存中缓存的请求都去查询物理数据库了，从而对数据库CPU和内存造成巨大压力，严重的会造成数据库宕机。从而形成一系列连锁反应，造成系统崩溃。</p><p><strong>解决方案：</strong></p><p>大多数系统设计者考虑用加锁（最多的解决方案）或者队列的方式保证不会有大量的现成对数据库一次性进行读写，从而避免失效时大量的并发请求落到底层存储系统上。</p><p>另外一种方案是将缓存失效时间分散，不要统一失效时间。</p><p><span style=""><strong>缓存穿透：</strong></span> 指的是用户查询数据时候，在数据库没有，自然在缓存也不存在。这样就会导致用户查询的时候在缓存中查询失败，每次都要去数据库再查询一次，并且最后返回空（相当于两次无效查询）。这样请求就绕过直接查询数据库，这也是经常提的缓存命中率问题。</p><p><strong>解决方案：</strong></p><p>最中间的是采用 <span style="color: rgb(245, 34, 45);"><strong>布隆过滤器</strong></span> ，将所有可能存在的数据哈希到一个足够大的bitmap仲，一个一定不存在的数据会被这个bitmap拦截掉，从而避免了对底层存储系统的查询压力。</p><p>另外一种更加简单粗暴的方法，如果一个查询返回数据未空（不管是数据不存在，还是系统故障）， <strong>我们仍然把这个空结果进行缓存</strong> ，但它的过期时间会很短，最长不超过5分钟。通过这个直接的设置的默认值存放到缓存，这样第二次到缓存中获取就有值了，而不会继续访问数据库，这种办法简单粗暴。</p><p>5TB的硬盘上放满了数据，请写一个算法将这些数据进行排重。如果这些数据一些是32bit大小的数据该如何解决？如果是64bit呢？</p><p><span style="color: rgb(245, 34, 45);">对于空间的利用到达一种极致，那就是Bitmap和布隆过滤器（Bloom Filter）</span> 。</p><p>Bitmap：典型的就是哈希表</p><p>缺点：Bitmap对于每个元素只能记录1bit信息，如果还想完成额外的功能，恐怕只能靠牺牲更多的空间、时间来完成。</p><p><span style="color: rgb(245, 34, 45);"><strong>布隆过滤器：</strong></span></p><p><span style="color: rgb(0, 0, 0);"><strong>就是引入了k(k&gt;1)个相互独立的哈希函数，保证在给定的空间、误判率下，完成元素判重的过程。它的优点是空间效率和查询时间都远远超过一半的算法，缺点是有一定的误识别率和删除困难。</strong></span></p><p><span style="color: rgb(0, 0, 0);"><strong>Bloom-Filter算法的核心思想就是利用多个不同的Hash函数来解决“冲突”。</strong></span></p><p><span style="color: rgb(0, 0, 0);"><strong>Hash存在一个冲突（碰撞）的问题，用同一个Hash得到的两个URL的值可能相同。为了减少冲突，我们可以引入几个Hash，如果通过其中的一个Hash值我们得出某个元素不在集合中，那么该元素肯定不存在集合中。只有在所有的Hash函数告诉我们该元素的集合时，才能确定该元素存在于集合中。</strong></span></p><p><strong><span style="color: rgb(77, 77, 77);">Bloom-Filter一般用于在大数据量的集合中判定某元素是否存在。</span></strong></p><p><span style="color: rgb(0, 0, 0);"><strong><br></strong></span></p><p><span style="color: rgb(245, 34, 45);"><strong>注意：</strong></span><strong>缓存穿透与缓存击穿的区别</strong></p><p><strong>缓存击穿：</strong>指一个key非常热点，大并发集中对这个key进行访问，当这个key在失效的瞬间，仍然持续的大并发访问就穿破缓存，转而直接请求数据库。</p><p>解决方案；在访问key之前，<span style="color: rgb(245, 34, 45);">采用SETNX（set if not exists）来设置另一个短期key来锁住当前key的访问</span>，访问结束再删除该短期key。</p><p><span style=""><strong>缓存预热：</strong></span>缓存预热是一个比较常见的概念，在系统上线之后，将相关的缓存数据直接加载到缓存系统。这样子就可以避免在用户请求的时候，先查询数据库，然后再将数据直接加载到缓存系统。这样做可以避免在用户请求时候，先查询数据库，然后再将数据缓存到内存。用户直接查询事先被预热的缓存数据。</p><p>解决思路：</p><p>1、直接写缓存刷新页面，上线时收工操作下；</p><p>2、数据量不大，可以在项目启动的时候自动进行加载；</p><p>3、定时刷新缓存</p><p><span style=""><strong>缓存更新：</strong></span>除了缓存服务器自带的缓存失效策略之外（Redis默认的有6种策略可供选择），我们还可以根据具体的业务需求进行自定义的缓存淘汰，常见的策略有两种：</p><p>1、定时去清理过期的缓存；</p><p>2、当有用户请求过来时，再判断这个请求所用到的缓存是否过期，过期的话就去底层系统得到新数据并更新缓存。</p><p>两者各有优劣，第一种的缺点是维护大量缓存的key比较麻烦的，第二种的缺点就是每次用户请求过来都要判断缓存是否失效，逻辑相对比较复杂！具体使用哪种方案，大家可以根据自己的应用场景来衡量</p><p><span style=""><strong>缓存降级：</strong></span>当访问量剧增、服务出现问题（如响应时间慢或者不响应）或者非核心服务影响到核心流程的性能时，仍然保证服务还是可用的，即使是有损服务，系统可以根据一些关键数据进行自动降级，也可以配置开关实现人工降级。</p><p>降级的最终目的是保证核心服务可用，即使是有损的。而且有些服务是无法降级的（如加入购物车、结算）</p><p>以参与日志级别设置预案：</p><p>1、一般：比如有些服务偶尔因为网络抖动或者服务正在上线而超时，可以自动降级；</p><p>2、警告：有些服务在一段时间内成功率有波动（如在95~100%之前）可以自动降级或者人工降级，并发出告警；</p><p>3、错误：比较可用率低于90%，或者数据连接池被打爆，或者访问量突然猛增到系统能承受的最大阀值，此时可以根据情况自动降级或者人工降级；</p><p>4、严重错误：比如因为特殊原因数据错误了，此时需要紧急人工降级；</p><p>服务降级的目的是为了防止Redis服务故障，导致数据库跟着一起发生雪崩问题。因此，对于不重要的缓存数据，可以采取服务降级策略，例如一个比较常见的做法就是，Redis出现问题，不去数据库查询，而是直接返回默认值给用户。</p><p><strong><span style="">热点数据</span></strong>：缓存有价值的数据</p><p>对于<span style=""><strong>冷数据</strong></span>而言，大部分数据可能还没有再次访问到已经被基础内存，不仅占用内存，而且价值不大。频繁修改的数据，看情况考虑使用缓存。</p><p>对于上面两个例子，寿星列表、导航信息都存在一个特点，就是信息修改频率不搞，读取数据通常非常高的场景。</p><p>对于热点数据，比如我们的某个IM产品，生日祝福模块，当天的寿星列表，缓存以后可能读取数据十万次。再举个例子，某个导航产品，我们讲导航信息，缓存以后可能读取数百万次。</p><p><span style="color: rgb(77, 77, 77);">再比如，这个读取接口对数据库的压力很大，但是又是热点数据，这个时候就需要考虑通过缓存手段，减少数据库的压力，比如我们的某助手产品的，点赞数，收藏数，分享数等是非常典型的热点数据，但是又不断变化，此时就需要将数据同步保存到Redis缓存，减少数据库压力。</span></p><h1 id="kzi3le6d0c7">3.Memcache与Redis的区别</h1><p>1、存储方式 Memecache把数据全部存在内存之中，断电后会挂掉，数据不能超过内存大小。 Redis有部份存在硬盘上，redis可以持久化其数据</p><p>2、数据支持类型 memcached所有的值均是简单的字符串，redis作为其替代者，支持更为丰富的数据类型 ，提供list，set，zset，hash等数据结构的存储</p><p>3、使用底层模型不同 它们之间底层实现方式 以及与客户端之间通信的应用协议不一样。 Redis直接自己构建了VM 机制 ，因为一般的系统调用系统函数的话，会浪费一定的时间去移动和请求。</p><p>4、value 值大小不同：Redis 最大可以达到 512M；memcache 只有 1mb。</p><p>5、redis的速度比memcached快很多</p><p>6、Redis支持数据的备份，即master-slave模式的数据备份</p><h1 id="fq8qinl135">4.单线程的redis为什么这么快</h1><p><span style="color: rgb(77, 77, 77);">1.纯内存操作</span></p><p><span style="color: rgb(77, 77, 77);">2.单线程操作，避免了频繁的上下文切换</span></p><p><span style="color: rgb(77, 77, 77);">3.采用了非阻塞I/O多路复用机制，实现零拷贝（epoll）</span></p><h1 id="5l9ydu6i8jd">5.redis的5种数据类型，以及每种数据类型的使用场景</h1><h2 id="1xloe6fo4v2">String</h2><p><span style="color: rgb(77, 77, 77);">这个其实没啥好说的，最常规的set/get操作，value可以是String也可以是数字。一般做一些复杂的计数功能的缓存</span></p><h2 id="5ect3rv0wif">hash</h2><p><span style="color: rgb(77, 77, 77);">这里value存放的是结构化的对象，比较方便的就是操作其中的某个字段。博主在做单点登录的时候，就是用这种数据结构存储用户信息，以cookieId作为key，设置30分钟为缓存过期时间，能很好的模拟出类似session的效果</span></p><h2 id="e5raznobojf">list</h2><p><span style="color: rgb(77, 77, 77);">使用List的数据结构，可以做简单的</span><span style="color: rgb(245, 34, 45);">消息队列</span><span style="color: rgb(77, 77, 77);">的功能。另外还有一个就是，可以利用lrange命令，做基于redis的分页功能，性能极佳，用户体验好。本人还用一个场景，很合适—取行情信息。就也是个生产者和消费者的场景。list可以很好的完成排队，先进先出的原则</span></p><h2 id="92d2205r7ph">set</h2><p>set堆放的是一堆不重复值的集合。所以可以做全局<span style="color: rgb(245, 34, 45);">去重</span>的功能。为什么不用JVM自带的Set进行去重？因为我们的系统一般都是集群部署，使用JVM自带的Set，比较麻烦，难道为了一个做一个全局去重，再起一个公共服务，太麻烦了。另外，就是利用交集、并集、差集等操作，可以计算共同喜好，全部的喜好，自己独有的喜好等功能</p><h2 id="xeuc6pywe6">sorted set</h2><p><span style="color: rgb(77, 77, 77);">sorted set多了一个权重参数score,集合中的元素能够按score进行排列。可以做排行榜应用，取TOP N操作</span></p><h1 id="k3v3bi1u5p">6.Redis 内部结构</h1><h2 id="iw63lobb09p">dict (字典)</h2><p><span style="color: rgba(0, 0, 0, 0.75);"> &nbsp; &nbsp; &nbsp;本质上是为了解决算法中的查找问题（Searching）是一个用于维护key和value映射关系的数据结构，与很多语言中的Map或dictionary类似。 本质上是为了解决算法中的查找问题（Searching）</span></p><h2 id="pbu5emgjwwj">sds （字符串）</h2><p><span style="color: rgba(0, 0, 0, 0.75);">sds就等同于char * 它可以存储任意二进制数据，不能像C语言字符串那样以字符’\0’来标识字符串的结束，因此它必然有个长度字段</span></p><h2 id="k87hl97brt">skiplist （跳跃表）</h2><p><span style="color: rgba(0, 0, 0, 0.75);"> </span><span style="color: rgba(0, 0, 0, 0.75);">跳跃表</span><span style="color: rgba(0, 0, 0, 0.75);">是一种实现起来很简单，单层多指针的链表，它查找效率很高，堪比优化过的二叉平衡树，且比平衡树的实现，</span></p><h2 id="dezsa924q8h">quicklist （快速表）</h2><h2 id="l0bfdv8l3an">ziplist （压缩表）</h2><p><span style="color: rgba(0, 0, 0, 0.75);">压缩表 ziplist是一个编码后的列表，是由一系列特殊编码的连续内存块组成的顺序型数据结构</span></p><p><span style="color: rgba(0, 0, 0, 0.75);"><br></span></p><p><span style="color: rgba(0, 0, 0, 0.75);"><br></span></p><h1 id="pouxe1qby4g">7.redis的过期策略以及内存淘汰机制</h1><p><span style="color: rgb(77, 77, 77);">redis采用的是 </span><span style=""><strong>定期删除 </strong></span><strong>+ </strong><span style=""><strong>惰性删除策略</strong></span><strong>；</strong></p><p><span style="color: rgb(245, 34, 45);">为什么不用定时删除策略?</span></p><p><span style="color: rgb(77, 77, 77);">定时删除,用一个定时器来负责监视key,过期则自动删除。虽然内存及时释放，但是十分消耗CPU资源。在大并发请求下，CPU要将时间应用在处理请求，而不是删除key,因此没有采用这一策略.</span></p><h2 id="uws1koj76v8">定期删除+惰性删除是如何工作的呢</h2><p>定期删除：redis默认每个100ms检查，是否有过期的key,有过期key则删除。需要说明的是，redis不是每个100ms将所有的key检查一次，而是<span style="color: rgb(245, 34, 45);">随机抽取</span>进行检查(如果每隔100ms,全部key进行检查，redis岂不是卡死)。因此，如果只采用定期删除策略，会导致很多key到时间没有删除。</p><p>惰性删除：也就是说在你获取某个key的时候，redis会检查一下，这个key如果设置了过期时间那么是否过期了，如果过期了此时就会删除。</p><p><span style="color: rgb(245, 34, 45);">采用定期删除+惰性删除就没其他问题了么？</span></p><p>不是的，如果定期删除没删除key。然后你也没即时去请求key，也就是说惰性删除也没生效。这样，redis的内存会越来越高。那么就应该采用内存淘汰机制。</p><p>在<span style="color: rgb(245, 34, 45);">redis.conf</span>中有一行配置</p><p><span style="color: rgb(255, 255, 255);"><strong>maxmemory-policy volatile-lru</strong></span></p><p>该配置就是配内存淘汰策略的(什么，你没配过？好好反省一下自己)</p><p><strong><span style="color: rgb(245, 34, 45);">volatile-lru：</span></strong>从已设置过期时间的数据集（server.db[i].expires）中挑选最近最少使用的数据淘汰</p><p><strong><span style="color: rgb(245, 34, 45);">volatile-ttl：</span></strong>从已设置过期时间的数据集（server.db[i].expires）中挑选将要过期的数据淘汰</p><p><strong><span style="color: rgb(245, 34, 45);">volatile-random：</span></strong>从已设置过期时间的数据集（server.db[i].expires）中任意选择数据淘汰</p><p><strong><span style="color: rgb(245, 34, 45);">allkeys-lru：</span></strong>从数据集（server.db[i].dict）中挑选最近最少使用的数据淘汰</p><p><strong><span style="color: rgb(245, 34, 45);">allkeys-random：</span></strong>从数据集（server.db[i].dict）中任意选择数据淘汰</p><p><strong><span style="color: rgb(245, 34, 45);">no-enviction（驱逐）</span></strong>：禁止驱逐数据，新写入操作会报错</p><p>ps：如果没有设置 expire 的key, 不满足先决条件(prerequisites); 那么 volatile-lru, volatile-random 和 volatile-ttl 策略的行为, 和 no-eviction(不删除) 基本上一致。</p><h1 id="0o3ybopbcvbo">8.Redis 为什么是单线程的</h1><p>官方FAQ表示，因为Redis是基于内存的操作，CPU不是Redis的瓶颈，Redis的瓶颈最有可能是机器内存的大小或者网络带宽。既然单线程容易实现，而且CPU不会成为瓶颈，那就顺理成章地采用单线程的方案了（毕竟采用多线程会有很多麻烦！）Redis利用队列技术将并发访问变为串行访问</p><h4 id="hsmzys7epw8">1.绝大部分请求是纯粹的内存操作（非常快速）</h4><h4 id="7lxl2pfb6mc">2.采用单线程,避免了不必要的上下文切换和竞争条件</h4><h4 id="qkq09c1b6vc">3.IO多路复用，非阻塞IO优点</h4><p>3.1 <span style="color: rgb(77, 77, 77);">速度快，因为数据存在内存中，类似于HashMap，HashMap的优势就是查找和操作的时间复杂度都是O(1)</span></p><p>3.2 支持丰富数据类型，支持string，list，set，sorted set，hash</p><p>3.3 <span style="color: rgb(77, 77, 77);">支持事务，操作都是原子性，所谓的原子性就是对数据的更改要么全部执行，要么全部不执行</span></p><p><span style="color: rgb(77, 77, 77);">3.4 丰富的特性：可用于缓存，消息，按key设置过期时间，过期后将会自动删除如何解决redis的并发竞争key问题</span></p><h3 id="801tzoovauc">同时有多个子系统去set一个key，这个时候要注意什么呢？</h3><p>首先，<span style="color: rgb(77, 77, 77);">不推荐使用redis的事务机制。因为我们的生产环境，基本都是redis集群环境，做了数据分片操作。你一个事务中有涉及到多个key操作的时候，这多个key不一定都存储在同一个redis-server上。因此，redis的事务机制，十分鸡肋。</span></p><p><span style="color: rgb(77, 77, 77);">解决方案：</span></p><p><span style="color: rgb(77, 77, 77);">1.</span><span style="color: rgb(77, 77, 77);">如果对这个key操作，不要求顺序： 准备一个分布式锁，大家去抢锁，抢到锁就做set操作即可</span></p><p><span style="color: rgb(77, 77, 77);">2.</span><span style="color: rgb(77, 77, 77);">如果对这个key操作，要求顺序： 分布式锁+时间戳。 假设这会系统B先抢到锁，将key1设置为{valueB 3:05}。接下来系统A抢到锁，发现自己的valueA的时间戳早于缓存中的时间戳，那就不做set操作了。以此类推</span></p><p><span style="color: rgb(77, 77, 77);">3.利用队列，将set方法变成串行访问也可以redis遇到高并发，如果保证读写key的一致性</span></p><p><span style="color: rgb(77, 77, 77);">对redis的操作都是具有原子性的,是线程安全的操作,你不用考虑并发问题,redis内部已经帮你处理好并发的问题了</span></p><p><span style="color: rgb(77, 77, 77);"><br></span></p><p><span style="color: rgb(77, 77, 77);"><br></span></p><h1 id="s4h30kiv1c">9.Redis的集群方案</h1><h2 id="t9oou7uy93">twemproxy</h2><p><span style="color: rgb(77, 77, 77);">它类似于一个</span><span style="color: rgb(245, 34, 45);">代理方式</span><span style="color: rgb(77, 77, 77);">， 使用时在本需要连接 redis 的地方改为</span><span style="color: rgb(245, 34, 45);">连接 twemproxy</span><span style="color: rgb(77, 77, 77);">， 它会以一个代理的身份接收请求并使用一致性 hash 算法，将请求转接到具体 redis，将结果再返回 twemproxy；</span></p><p><span style="color: rgb(77, 77, 77);">缺点： twemproxy 自身单端口实例的压力，使用一致性 hash 后，对 redis 节点数量改变时候的计算值的改变，数据无法自动移动到新的节点</span></p><h2 id="02b1e1mq3dwh">codis</h2><p><span style="color: rgb(77, 77, 77);">目前用的最多的集群方案，基本和 twemproxy 一致的效果，但它支持在节点数量改变情况下，旧节点数据可恢复到新 hash 节点</span></p><p><span style="color: rgb(77, 77, 77);"><br></span></p><h2 id="ere8wf281og">redis sentinel</h2><p>哨兵模式，也属于代理模式</p><h2 id="als6ovki29c">cluster</h2><p><span style="color: rgb(77, 77, 77);">redis cluster3.0以上自带的集群，特点在于他的分布式算法不是一致性 hash，而是 hash 槽的概念，以及自身支持节点设置从节点。</span></p><h1 id="en5aekm16xj">10.是否有进行多机redis 的部署经验，如何保证数据一致的？</h1><h4 id="mxqswx6ijz">主从复制，读写分离</h4><p><span style="color: rgb(77, 77, 77);">一类是主数据库（master）一类是从数据库（slave），主数据库可以进行读写操作，当发生写操作的时候自动将数据同步到从数据库，而从数据库一般是只读的，并接收主数据库同步过来的数据，一个主数据库可以有多个从数据库，而一个从数据库只能有一个主数据库</span></p><h1 id="b5pop6icogd">11.对于大量的请求，Redis怎么样处理</h1><h4 id="joyerxvc9rr">单线程，IO多路复用处理多个socket的读写</h4><p>1. redis是一个单线程程序，也就说同一时刻它只能处理一个客户端请求</p><p>2. redis是通过IO多路复用（select，epoll, kqueue，依据不同的平台，采取不同的实现）来处理多个客户端请求的</p><h1 id="tcay8u32tff">12.Redis 常见性能问题和解决方案</h1><p>1. Master 最好不要做任何持久化工作，如 RDB 内存快照和 AOF 日志文件</p><p>2. 如果数据比较重要，某个 Slave 开启 AOF 备份数据，策略设置为每秒同步一次</p><p>3. 为了主从复制的速度和连接的稳定性， Master 和 Slave 最好在同一个局域网内</p><p>4. 尽量避免在压力很大的主库上增加从库</p><p>5. 主从复制不要用图状结构，用单向链表结构更为稳定，即： Master &lt;- Slave1 &lt;- Slave2 &lt;-</p><p>Slave3…</p><h1 id="jrj6mp1qirf">13.Redis线程模型</h1><p><img src="https://cdn.nlark.com/yuque/0/2020/png/1166905/1591461373093-355dbd22-9b8d-42d2-b4e5-4abfd631d905.png" alt="image.png"></p><p>Redis结构包括分别是<span style=""><strong>套接字</strong></span>、<strong><span style=""> I/O 多路复用程序</span></strong>、 <span style=""><strong>文件事件分派器（dispatcher）</strong></span>、 以及<strong><span style="">事件处理器</span></strong>。使用 I/O 多路复用程序来同时监听多个套接字， 并根据套接字目前执行的任务来为套接字关联不同的事件处理器。当被监听的套接字准备好执行<span style="color: rgb(245, 34, 45);">连接应答（accept）</span>、<span style="color: rgb(245, 34, 45);">读取（read）</span>、<span style="color: rgb(245, 34, 45);">写入（write）</span>、<span style="color: rgb(245, 34, 45);">关闭（close）</span>等操作时， 与操作相对应的文件事件就会产生， 这时文件事件处理器就会调用套接字之前关联好的事件处理器来处理这些事件。</p><h4 id="lcj4jk3rhr">工作原理：</h4><p><strong>I/O 多路复用程序：</strong>负责监听多个套接字， 并向文件事件分派器传送那些产生了事件的套接字。尽管多个文件事件可能会并发地出现， 但 <strong>I/O 多路复用程序总是会将所有产生事件的套接字都入队到一个队列里面</strong>， 然后通过这个队列， 以<span style="color: rgb(245, 34, 45);">有序（sequentially）</span>、<span style="color: rgb(245, 34, 45);">同步（synchronously）</span>、每次一个套接字的方式向文件事件分派器传送。 &nbsp; &nbsp;</p><p><strong>套接字：</strong> 当上一个套接字产生的事件被处理完毕之后（该套接字为事件所关联的事件处理器执行完毕）， <strong>I/O 多路复用程序</strong>才会继续向文件事件分派器传送下一个套接字；如果一个套接字又可读又可写的话， 那么服务器将先读套接字， 后写套接字。</p><h1 id="1zs452rvod2i">14.为什么Redis的操作是原子性的，怎么保证原子性的</h1><h3 id="3l082m06p7t">单线程</h3><p><span style="color: rgb(77, 77, 77);">对于Redis而言，命令的原子性指的是：一个操作的不可以再分，操作要么执行，要么不执行。</span></p><p><span style="color: rgb(77, 77, 77);">Redis的操作之所以是原子性的，</span><span style="color: rgb(245, 34, 45);"><strong>是因为Redis是单线程的</strong></span><span style="color: rgb(77, 77, 77);">。Redis本身提供的</span><span style="color: rgb(245, 34, 45);">所有API都是原子操作</span><span style="color: rgb(77, 77, 77);">，Redis中的事务其实是要保证批量操作的原子性。</span></p><h3 id="d4e5ro64cyi">多个命令在并发中也是原子性的吗？</h3><p><span style="color: rgb(77, 77, 77);">不一定， 将get和set改成单命令操作，使用原子计数器incr，防止并发请求。使用Redis的事务，或者使用Redis+Lua等等的方式实现</span></p><h1 id="mnubio8pwul">15.Redis事务</h1><h3 id="w2k8obfm15">MULTI、EXEC、DISCARD和WATCH </h3><p><span style="color: rgb(77, 77, 77);">Redis事务功能是通过MULTI、EXEC、DISCARD和WATCH 四个原语实现的。</span></p><p><span style="color: rgb(77, 77, 77);">Redis会将一个事务中的所有命令序列化，然后按顺序执行。</span></p><p><span style="color: rgb(77, 77, 77);"><br></span></p><p>1.redis <span style="color: rgb(245, 34, 45);">不支持回滚</span>“Redis 在事务失败时不进行回滚，而是继续执行余下的命令”， 所以 Redis 的内部可以保持简单且快速。</p><p>2.如果在一个事务中的命令出现错误，那么所有的命令都不会执行；</p><p>3.如果在一个事务中出现运行错误，那么正确的命令会被执行。</p><p>注：redis的discard只是结束本次事务,正确命令造成的影响仍然存在.</p><p><span style="color: rgb(77, 77, 77);"><br></span></p><p><span style="color: rgb(77, 77, 77);">1）</span><strong><span style="color: rgb(77, 77, 77);">MU</span></strong><strong><span style="color: rgb(77, 77, 77);">LTI命令</span></strong><span style="color: rgb(77, 77, 77);">：</span><span style="color: rgb(77, 77, 77);">用于开启一个事务，它总是返回OK。 MULTI执行之后，客户端可以继续向服务器发送任意多条命令，这些命令不会立即被执行，而是被放到一个队列中，当EXEC命令被调用时，所有队列中的命令才会被执行。</span></p><p><span style="color: rgb(77, 77, 77);">2）</span><strong><span style="color: rgb(77, 77, 77);">EXEC命令：</span></strong><span style="color: rgb(77, 77, 77);">执行所有事务块内的命令。返回事务块内所有命令的返回值，按命令执行的先后顺序排列。 当操作被打断时，返回空值 nil 。</span></p><p><span style="color: rgb(77, 77, 77);">3）通过调用</span><strong><span style="color: rgb(77, 77, 77);">DISCARD命令</span></strong><span style="color: rgb(77, 77, 77);">，</span><span style="color: rgb(77, 77, 77);">客户端可以清空事务队列，并放弃执行事务， 并且客户端会从事务状态中退出。</span></p><p><span style="color: rgb(77, 77, 77);"><br></span></p><p><span style="color: rgb(77, 77, 77);">4）</span><strong><span style="color: rgb(77, 77, 77);">WATCH 命令</span></strong><span style="color: rgb(77, 77, 77);">：</span><span style="color: rgb(77, 77, 77);">可以为 Redis 事务提供 check-and-set （CAS）行为。 可以监控一个或多个键，一旦其中有一个键被修改（或删除），之后的事务就不会执行，监控一直持续到EXEC命令。</span></p><h1 id="5p1ymb263vb">16.Redis实现分布式锁</h1><h4 id="y5rh88cr83"><span style="color: rgb(245, 34, 45);">SETNX</span></h4><p><span style="color: rgb(77, 77, 77);">Redis为单进程单线程模式，采用队列模式将并发访问变成串行访问，且多客户端对Redis的连接并不存在竞争关系Redis中可以使用</span><span style="color: rgb(245, 34, 45);"><strong>SETNX</strong></span><span style="color: rgb(77, 77, 77);">命令实现分布式锁</span><span style="color: rgb(77, 77, 77);">。</span></p><h4 id="q1x2gjr4nh">解锁： del key</h4><p>使用 del key 命令就能释放锁</p><h4 id="gu8qvcpv26e">解决死锁：</h4><p>1.通过Redis中expire()给锁设定最大持有时间，如果超过，则Redis来帮我们释放锁。</p><p>2.使用 setnx key “当前系统时间+锁持有的时间”和getset key “当前系统时间+锁持有的时间”组合的命令就可以实现。</p><h4 id="k58n6pp5gkc"><br></h4><h1 id="sfp87mwsi2g"><br></h1></div>
        </div>

      </div>

    </el-main>

  </el-container>

</template>

<script>

  export default {
    props: ['value'],
    data() {
      return {
        articleTitle: "",
        articleContent: "",
        queryInput:""
      }
    },
    components: {
    },
    mounted() {
      this.createEditor();
    },
    methods: {
      createEditor(){
      },
      go2HomePage() {
        this.$router.push({
          path:'/'
        });
      },
      go2Page(path) {
        if (path == '/') {
          if (window.location.hash == '#/') {
            console.log("aready here");
            return;
          }
          this.$router.push({
            path:path
          });
          return;
        }
        if (document.location.href.indexOf(path) != -1) {
          console.log("aready here");
          return;
        }
        this.$router.push({
          path:path
        });
      },
      selectMore(cmd){
        switch (cmd){
          case '0':{
            this.go2Page('/');
          }break;
          case '1':{

          }break;
          default:break;
        }
      }

    }
  }
</script>

<style lang="less">

  .icu-article-detail .header-holder {
    height: 60px;
    width: 100%;
  }

  .icu-article-detail .el-main {
    min-height: 1024px;
    width: 100%;
  }

  .icu-article-detail  .el-header {
    background-color: #fff;
    text-align: center;
    line-height: 68px;
    position: fixed;
    width: 100%;
    height: 68px !important;
    z-index: 999999;
    box-shadow: #e4e3e3 1px 1px 1em 1px;
  }

  .icu-article-detail .icu-content .el-col {
    background-color: white;
  }

  .icu-article-detail .icu-broswer i {
    font-size: 2.4em;
    color: #409EFF;
    cursor: pointer;
    padding: 0.4em 1em 0 0;
  }

  .icu-article-detail .icu-editor-title {
    font-size: 14px;
    text-align: left;
  }

  .icu-article-detail .icu-editor-title .main-title {
    cursor: pointer;
  }

  .icu-article-detail .icu-editor-title .seperate {

  }

  .icu-article-detail .icu-editor-title .sec-title {
    cursor: pointer;
    font-weight: 700;
  }


  .icu-article-detail  .icu-article-save .el-button{
    margin-right: 1em;
  }

  .icu-article-detail  .icu-article-publish .el-button{
    margin-left: 1em;
  }

  .icu-article-detail  .icu-article-more {
    font-size: 18px;
    color: darkgray;
    cursor: pointer;
    padding-left: 1em;
  }


  .icu-article-detail  .icu-article-title .el-input{
    height: 50px;
    font-size: 32px;
    border: none;
  }
  .icu-article-detail  .icu-article-title .el-input .el-input__inner{
    border: none;
    font-weight: 700;
  }



  .icu-article-detail  .icu-article-more .el-dropdown-link {
    color: darkgray;
  }


  /****editor*****/
  .icu-article-detail .icu-content{
    width: 952px;
    background-color: white;
    margin: 0 auto;
  }

  .icu-article-detail .icu-content .icu-article-content-title{
    font-size: 36px;
    line-height: 3;
    font-weight: 700;
    color: #262626;
    display: inline;
  }

  .icu-article-detail .icu-content .icu-article-content-editor{
    text-align: left;
    padding: 20px 60px 90px 60px;
  }



</style>
