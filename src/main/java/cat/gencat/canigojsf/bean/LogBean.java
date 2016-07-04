package cat.gencat.canigojsf.bean;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.StringTokenizer;

import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.faces.model.SelectItem;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.primefaces.event.NodeSelectEvent;
import org.primefaces.model.DefaultTreeNode;
import org.primefaces.model.TreeNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import cat.gencat.ctti.canigo.arch.core.logging.jmx.Log4jManagerImpl;

@Component("LogBean")
public class LogBean {


private static final Log log = LogFactory.getLog(LogBean.class);
	
	//LOG LEVELS
	private static final String LOG_DEBUG 	= "debug";
	private static final String LOG_INFO 	= "info";
	private static final String LOG_WARN 	= "warn";
	private static final String LOG_ERROR 	= "error";
	private static final String LOG_FATAL 	= "fatal";
	
	@Autowired
	private Log4jManagerImpl log4jManager;
	
	private String logLevel = "";
	private String addAppender = "";
	
	//TreeNode
	private DefaultTreeNode treeNode = null;
	private static final String treeNodeName = "Appenders";

	public String getLogLevel() {
		return logLevel;
	}

	public void setLogLevel(String logLevel) {
		this.logLevel = logLevel;
	}
	
	public String getAddAppender() {
		return addAppender;
	}

	public void setAddAppender(String addAppender) {
		this.addAppender = addAppender;
	}
	
	public DefaultTreeNode getTreeNode() {
		if (treeNode == null) {
			loadTree();
		}
		return treeNode;
	}

	public void addLogLevel() {
		FacesMessage facesMessage = null;
		String resultat = "";
		
		if (getAuthorizedLevels().contains(logLevel) && addAppender != null && !addAppender.equals("")) {
			try {
				log4jManager.setLogLevel(addAppender, logLevel);
				addNode(addAppender, treeNode);
				resultat = "S'han canviat l'appender '" + addAppender + "' al nivell '" + logLevel + "'.";
			} catch (Exception e) {
				log.info("No s'ha pogut canviar l'appender del servei '" + logLevel + "'.");
			}
			log.debug(resultat);
			
			facesMessage = new FacesMessage(FacesMessage.SEVERITY_INFO, resultat, null);
			FacesContext.getCurrentInstance().addMessage("logLevelForm", facesMessage);
		} else {
			facesMessage = new FacesMessage(FacesMessage.SEVERITY_ERROR, "El appender �s obligatori", null);
			FacesContext.getCurrentInstance().addMessage("logLevelForm", facesMessage);
		}
	}

	public void changeAllLogLevels() {
		FacesMessage facesMessage = null;
		String resultat = "";
		
		if (getAuthorizedLevels().contains(logLevel)) {
			String[] activeLoggerNames = log4jManager.getActiveLoggerNames();
			int logsOK = 0;
			int logsTotals = 0;
			for (int i=0; i< activeLoggerNames.length; i++) {
				try {
					log4jManager.setLogLevel(activeLoggerNames[i], logLevel);
				} catch (Exception e) {
					log.info("No s'ha pogut canviar l'appender del servei '" + logLevel + "'.");
				} finally {
					logsTotals++;
				}
				logsOK++;
			}
			resultat = "S'han canviat " + logsOK + " de " + logsTotals + " appenders.";
			log.debug(resultat);
			
			facesMessage = new FacesMessage(FacesMessage.SEVERITY_INFO, resultat, null);
			FacesContext.getCurrentInstance().addMessage("logLevelForm", facesMessage);
		} else {
			facesMessage = new FacesMessage(FacesMessage.SEVERITY_ERROR, "El nivell de log �s obligatori", null);
			FacesContext.getCurrentInstance().addMessage("logLevelForm", facesMessage);
		}
	}
	
	public List<SelectItem> getLevels() {
		List<SelectItem> levels = new ArrayList<SelectItem>();
		List<String> authorizedLevels = getAuthorizedLevels();
		for (int i=0; i<authorizedLevels.size(); i++) {
			levels.add(new SelectItem(authorizedLevels.get(i), authorizedLevels.get(i)));
		}
		return levels;
	}
	
	public void processSelection(NodeSelectEvent event) {
        DefaultTreeNode currentNode = (DefaultTreeNode) event.getTreeNode();
		String appender = null;
    	while (!((String)currentNode.getData()).equals(treeNodeName)) {
    		if (appender == null) {
    			appender = (String)currentNode.getData();
    		} else {
    			appender = (String)currentNode.getData() + "." + appender;
    		}
    		currentNode = (DefaultTreeNode)currentNode.getParent();
    	}
    	addAppender = appender;
    	String level = log4jManager.getLogLevel(appender).toLowerCase();
    	logLevel = level;
    }
	
	private void loadTree() {
		treeNode = new DefaultTreeNode(treeNodeName, null);
        
        String[] activeLoggerNames = log4jManager.getActiveLoggerNames();
		for (int i=0; i< activeLoggerNames.length; i++) {
			System.out.println("activeLoggerNames["+i+"]: " +  activeLoggerNames[i]);
			addNode(activeLoggerNames[i], treeNode);
		}		
	}
	
	private void addNode(String completeChildValue, DefaultTreeNode node) {
		
		DefaultTreeNode actualTreeNode = node;

		StringTokenizer st = new StringTokenizer(completeChildValue, ".");

		while (st.hasMoreTokens()) {
			String aux = st.nextToken();

			DefaultTreeNode childNode = getChildNode(actualTreeNode, aux);
			if (childNode == null) {
				//Si no contiene ese nodo lo creamos y se lo a�adimos
				childNode = new DefaultTreeNode(aux, actualTreeNode);
//				actualTreeNode.getChildren().add(contador++, childNode);
			}
			actualTreeNode = childNode;
		}
	}
	
	private DefaultTreeNode getChildNode(DefaultTreeNode parent, String childValue) {
		Iterator<TreeNode> it = parent.getChildren().iterator();
		while (it.hasNext()) {
			DefaultTreeNode entry = (DefaultTreeNode)it.next();
			if (((String)entry.getData()).equals(childValue)){
				return entry;
			}
		}
		return null;
	}
	
	private List<String> getAuthorizedLevels() {
		List<String> authLevels = new ArrayList<String>();
		authLevels.add(LOG_DEBUG);
		authLevels.add(LOG_INFO);
		authLevels.add(LOG_WARN);
		authLevels.add(LOG_ERROR);
		authLevels.add(LOG_FATAL);
		return authLevels;
	}
}
