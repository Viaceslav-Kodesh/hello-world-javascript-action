import * as core from '@actions/core';
import { ToolRunner, argStringToArray } from "@actions/exec/lib/toolrunner";
import OpenStack from 'js-openstack-lib';

const exec = require('@actions/exec');

// Initialize cloud
// cloudConfig is a JSON object corresponding to clouds.yaml
// (It is your responsibility to load and parse it)



async function openstackConnect() {
    const userName = core.getInput('OS_USERNAME');
    const authUrl = core.getInput('OS_AUTH_URL');
    const projectDomainName = core.getInput('PROJECT_DOMAIN_NAME');
    const userPassword = core.getInput('OS_PASSWORD');
    const userDomainName = core.getInput('OS_USER_DOMAIN_NAME');
    const projectName = core.getInput('OS_PROJECT_NAME');
    const clusterName = core.getInput('CLUSTER_NAME');

    const openStack = new OpenStack({
        region_name: 'Region1',
        auth: {
          username: userName,
          password: userPassword,
          project_name: projectName,
          auth_url: authUrl
        }
      });
      // List all flavors
      openStack.networkList()
        .then((networks) => {
          console.log(networks);
        });
    }

async function exportKubeconfig() {
    core.exportVariable('KUBECONFIG', './config');
  }

// test run: kubectl cluster-info
async function kubectl() {
    await exec.exec('kubectl cluster-info');
    }

async function run() {
    await openstackConnect();
}

run();
