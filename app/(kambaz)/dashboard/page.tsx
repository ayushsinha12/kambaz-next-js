import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
 return (
  <div id="wd-dashboard">
   <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
   <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
   <div id="wd-dashboard-courses">
    <div className="wd-dashboard-course">
     <Link href="/courses/1234" className="wd-dashboard-course-link">
      <Image src="/images/reactjs.png" width={200} height={150} alt="reactjs" />
      <div>
       <h5> CS1234 React JS </h5>
       <p className="wd-dashboard-course-title">
        Full Stack software developer
       </p>
       <button> Go </button>
      </div>
     </Link>
    </div>

    <div className="wd-dashboard-course"> 
        <Link href="/courses/1234" className="wd-dashboard-course-link">
        <Image src="/images/nodejs.png" width={200} height={150} alt="reactjs" />
        <div>
        <h5> CS2234 Node JS </h5>
        <p className="wd-dashboard-course-title">
            Full Stack software developer
        </p>
        <button> Go </button>
        </div>
     </Link>
    </div>

    <div className="wd-dashboard-course"> 
    <Link href="/courses/1234" className="wd-dashboard-course-link">
      <Image src="/images/aws.jpeg" width={200} height={150} alt="reactjs" />
      <div>
       <h5> CS2222 AWS </h5>
       <p className="wd-dashboard-course-title">
        Full Stack software developer
       </p>
       <button> Go </button>
      </div>
    </Link>
    </div>

    <div className="wd-dashboard-course"> 
    <Link href="/courses/1234" className="wd-dashboard-course-link">
      <Image src="/images/azure.jpg" width={200} height={150} alt="reactjs" />
      <div>
       <h5> CS2223 Azure </h5>
       <p className="wd-dashboard-course-title">
        Full Stack software developer
       </p>
       <button> Go </button>
      </div>
    </Link>
    </div>

    <div className="wd-dashboard-course"> 
    <Link href="/courses/1234" className="wd-dashboard-course-link">
      <Image src="/images/python.png" width={200} height={150} alt="reactjs" />
      <div>
       <h5> CS3000 Python </h5>
       <p className="wd-dashboard-course-title">
        Full Stack software developer
       </p>
       <button> Go </button>
      </div>
    </Link>
    </div>

    <div className="wd-dashboard-course"> 
    <Link href="/courses/1234" className="wd-dashboard-course-link">
      <Image src="/images/flask.webp" width={200} height={150} alt="reactjs" />
      <div>
       <h5> CS3100 Flask </h5>
       <p className="wd-dashboard-course-title">
        Full Stack software developer
       </p>
       <button> Go </button>
      </div>
    </Link>
    </div>

    <div className="wd-dashboard-course"> 
    <Link href="/courses/1234" className="wd-dashboard-course-link">
      <Image src="/images/sql.png" width={200} height={150} alt="reactjs" />
      <div>
       <h5> CS3200 Database Design </h5>
       <p className="wd-dashboard-course-title">
        Full Stack software developer
       </p>
       <button> Go </button>
      </div>
    </Link>
    </div>

   </div>
  </div>
);}
