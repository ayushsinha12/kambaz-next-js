import EnvironmentVariables from "./environmentVariables";
import HttpClient from "./httpClient";
import PathParameters from "./pathParameters";
import QueryParameters from "./queryParameters";
import WorkingWithArrays from "./workingWithArrays";
import WorkingWithArraysAsynchronously from "./workingWithArraysAsynchronously";
import WorkingWithObjects from "./workingWithObjects";
import WorkingWithObjectsAsynchronously from "./workingWithObjectsAsynchronously";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function Lab5() {
  return (
    <div id="wd-lab5">
      <h2>Lab 5</h2>
      <div className="list-group">
        <a href={`${HTTP_SERVER}/lab5/welcome`} className="list-group-item">
          Welcome
        </a>
      </div><hr />
      <EnvironmentVariables />
      <PathParameters/>
      <QueryParameters/>
      <WorkingWithObjects/>
      <WorkingWithArrays/>
      <HttpClient/>
      <WorkingWithObjectsAsynchronously/>
      <WorkingWithArraysAsynchronously/>
    </div>
);}
